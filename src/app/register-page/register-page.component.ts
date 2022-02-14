import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthConfigService,
  ConsentTemplate,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { CmsComponentData, CustomFormValidators, sortTitles } from '@spartacus/storefront';
import {
  Title,
  UserRegisterFacade,
  UserSignUp,
} from '@spartacus/user/profile/root';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  
  titles$: Observable<Title[]>;

  isLoading$ = new BehaviorSubject(false);
  
  registerForm = this.fb.group({
      titleCode: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: [
        '',
        [Validators.required],
      ],
      passwordconf: ['', Validators.required],
      newsletter: new FormControl({
        value: false,
        disabled: this.isConsentRequired(),
      }),
      termsandconditions: [false, Validators.requiredTrue],
    }
  );
  private subscription = new Subscription();

  anonymousConsent$: Observable<{
    consent: AnonymousConsent;
    template: string;
  }>;
  public data$: Observable<any> = this.componentData.data$;
  result: any;

  constructor(
    protected userRegister: UserRegisterFacade,
    protected globalMessageService: GlobalMessageService,
    private fb: FormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected authConfigService: AuthConfigService,
    private apiService: ApiService,
    private componentData: CmsComponentData<any>,
  ) {
      this.titles$ = this.userRegister.getTitles().pipe(
      map((titles: Title[]) => {
        return titles.sort(sortTitles);
      })
    );
        const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent ?? '';

    this.anonymousConsent$ = combineLatest([
      this.anonymousConsentsService.getConsent(registerConsent),
      this.anonymousConsentsService.getTemplate(registerConsent),
    ]).pipe(
      map(([consent, template]: [AnonymousConsent, ConsentTemplate]) => {
        return {
          consent,
          template: template?.description ? template.description : '',
        };
      })
    );
  }

  ngOnInit() {

    // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
    this.subscription.add(
      this.globalMessageService
        .get()
        .pipe(filter((messages) => !!Object.keys(messages).length))
        .subscribe((globalMessageEntities: GlobalMessageEntities) => {
          const messages =
            globalMessageEntities &&
            globalMessageEntities[GlobalMessageType.MSG_TYPE_ERROR];

          if (
            messages &&
            messages.some((message) => message === 'This field is required.')
          ) {
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.globalMessageService.add(
              { key: 'register.titleRequired' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        })
    );

    this.subscription.add(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.registerForm.get('newsletter')!.valueChanges.subscribe(() => {
        this.toggleAnonymousConsent();
      })
    );

    this.data$.subscribe(event => {
     console.log(event)
     this.result = event
    }); 
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.registerUser();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerUser(): void {
    this.isLoading$.next(true);
    this.apiService
      .registerUser(this.collectDataFromRegisterForm(this.registerForm.value))
      .subscribe((res) => {
        console.log(res)
        this.onRegisterUserSuccess();
        this.isLoading$.next(false);
      },
      (error) => {
        console.log(error)
      }      
    );
  }

  titleSelected(title: Title): void {
    this.registerForm['controls'].titleCode.setValue(title.code);
  }

  collectDataFromRegisterForm(formData: any): any {
    const { firstName, lastName, email, password, titleCode } = formData;

    return {
      firstName,
      lastName,
      uid: email.toLowerCase(),
      password,
      titleCode,
    };
  }

  isConsentGiven(consent: AnonymousConsent): boolean {
    return this.anonymousConsentsService.isConsentGiven(consent);
  }

  private isConsentRequired(): boolean {
    const requiredConsents =
      this.anonymousConsentsConfig?.anonymousConsents?.requiredConsents;
    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;

    if (requiredConsents && registerConsent) {
      return requiredConsents.includes(registerConsent);
    }

    return false;
  }

  private onRegisterUserSuccess(): void {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.router.go('login');
    }
    this.globalMessageService.add(
      { key: 'register.postRegisterMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  toggleAnonymousConsent(): void {
    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;

    if (registerConsent) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (Boolean(this.registerForm.get('newsletter')!.value)) {
        this.anonymousConsentsService.giveConsent(registerConsent);
      } else {
        this.anonymousConsentsService.withdrawConsent(registerConsent);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
