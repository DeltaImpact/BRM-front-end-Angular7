import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RoleAndPermissionCardComponent} from './role-permission-card.component';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from '../../modules/tests.module';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {TranslateModule} from '@ngx-translate/core';

describe('HeroCardComponent', () => {
  let component: RoleAndPermissionCardComponent;
  let fixture: ComponentFixture<RoleAndPermissionCardComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        RoleAndPermissionCardComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAndPermissionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should like a hero', () => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    const hero = new Hero({likes: 1});
    hero.like();
    expect(hero.likes).toBe(2);
  });

  it('should not like a hero', () => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    expect(HeroService.checkIfUserCanVote()).toBe(false);
  });
});
