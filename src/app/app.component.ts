import { Component, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { GetDataService } from './shared/get-data.service';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import * as _moment from 'moment';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  Currentdate = new Date();
  y = this.Currentdate.getFullYear();
  mobileQuery: MediaQueryList;
  viewAv = false;
  title = "";
  private _mobileQueryListener: () => void;
  constructor(titleService: Title, router: Router, activatedRoute: ActivatedRoute, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private getDataService: GetDataService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.title = this.getTitle(router.routerState, router.routerState.root).join('-');
        titleService.setTitle(this.title);
      }
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    {


      iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('assets/materialicons/baseline-menu-24px.svg'));
      iconRegistry.addSvgIcon(
        'money',
        sanitizer.bypassSecurityTrustResourceUrl('assets/materialicons/baseline-money-24px.svg'));

      iconRegistry.addSvgIcon(
        'arrow_upward',
        sanitizer.bypassSecurityTrustResourceUrl('assets/materialicons/baseline-arrow_upward-24px.svg'));
      iconRegistry.addSvgIcon(
        'arrow_downward',
        sanitizer.bypassSecurityTrustResourceUrl('assets/materialicons/baseline-arrow_downward-24px.svg'));
      iconRegistry.addSvgIcon(
        'settings_ethernet',
        sanitizer.bypassSecurityTrustResourceUrl('assets/materialicons/baseline-settings_ethernet-24px.svg'));
      iconRegistry.addSvgIcon(
        'calendar_today',
        sanitizer.bypassSecurityTrustResourceUrl('assets/materialicons/baseline-calendar_today-24px.svg'));
      iconRegistry.addSvgIcon(
        'bar_chart',
        sanitizer.bypassSecurityTrustResourceUrl('assets/materialicons/baseline-bar_chart-24px.svg'));
      iconRegistry.addSvgIcon(
        'bar_chart',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bar_chart.svg'));
      iconRegistry.addSvgIcon(
        'line_chart',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/line_chart.svg'));
      iconRegistry.addSvgIcon(
        'dashboard',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg'));
      iconRegistry.addSvgIcon(
        'sales',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sales.svg'));
      iconRegistry.addSvgIcon(
        'filter_user',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/filter_user.svg'));
      iconRegistry.addSvgIcon(
        'avatar',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/avatar.svg'));
      iconRegistry.addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg'));
      iconRegistry.addSvgIcon(
        'cloud_download',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloud_download.svg'));
      iconRegistry.addSvgIcon(
        'gps_fixed',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/gps_fixed.svg'));
      iconRegistry.addSvgIcon(
        'cloud_upload',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloud_upload.svg'));
      iconRegistry.addSvgIcon(
        'tick',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/tick.svg'));
      iconRegistry.addSvgIcon(
        'target',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/target.svg'));
      iconRegistry.addSvgIcon(
        'equal',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/equal.svg'));
      iconRegistry.addSvgIcon(
        'stop',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/stop.svg'));
      iconRegistry.addSvgIcon(
        'play',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/play.svg'));
      iconRegistry.addSvgIcon(
        'arrow_back',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_back.svg'));
      iconRegistry.addSvgIcon(
        'arrow_forward',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_forward.svg'));
      iconRegistry.addSvgIcon(
        'people',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/people.svg'));
      iconRegistry.addSvgIcon(
        'info',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg'));
      iconRegistry.addSvgIcon(
        'info',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg'));
      iconRegistry.addSvgIcon(
        'search',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'));
      iconRegistry.addSvgIcon(
        'playlist_add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/playlist_add.svg'));
      iconRegistry.addSvgIcon(
        'remove_circle_outline',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/remove_circle_outline.svg'));
      iconRegistry.addSvgIcon(
        'person_pin_circle',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/person_pin_circle.svg'));
      iconRegistry.addSvgIcon(
        'transfer_within_a_station',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/transfer_within_a_station.svg'));
      iconRegistry.addSvgIcon(
        'compare',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/compare.svg'));
      iconRegistry.addSvgIcon(
        'conversation',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/conversation.svg'));
      iconRegistry.addSvgIcon(
        'funnel',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/funnel.svg'));
      iconRegistry.addSvgIcon(
        'question_mark',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/question_mark.svg'));
        iconRegistry.addSvgIcon(
          'differant',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/differant.svg'));
          iconRegistry.addSvgIcon(
            'report',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/report.svg'));
            iconRegistry.addSvgIcon(
              'seo',
              sanitizer.bypassSecurityTrustResourceUrl('assets/icons/seo.svg'));
    }
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
  Username = "";
  ImageUser = "";
  timer;
  ngOnInit() {
    let x = this;
    
    let usersAccess = ["MHDABDAL", "AHMADB", "WASEEMK", "SAMIRK", "MHDHAM", "MAGDAS", "MANALJ", "MHDSHEI"];
    let access = false;
    x.viewAv = true;
    this.getDataService.getJson('Profile').subscribe(_Array => {
      if((<string>_Array).split('\\').length == 2){
        x.ImageUser = "http://mysites/User%20Photos/Profile%20Pictures/" + (<string>_Array).split('\\')[1] + "_LThumb.jpg"
        x.Username = ((<string>_Array).split('\\')[1]).toUpperCase();
      }else{
        x.ImageUser = "http://mysites/User%20Photos/Profile%20Pictures/" + (<string>_Array) + "_LThumb.jpg"
      x.Username = ((<string>_Array)).toUpperCase();
      }
      
      // x.viewAv = true;
      // for (let index = 0; index < usersAccess.length; index++) {
      //   const element = usersAccess[index];
      //   if (x.Username.toUpperCase() == element) {
      //     access = true;
          

      //   }
      // }
      // if (access == false) {
      //   window.location.replace("http://thserv207:8093/AccessDenied.html");
      // }
    });

    
    this.timer = interval(3000).pipe(
      map((x) => {
        this.reload();
      })
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



  reload() {
    if (Number(_moment(new Date()).format('h')) == 8
      && Number(_moment(new Date()).format('mm')) == 1
      && Number(_moment(new Date()).format('ss')) < 15
      && Number(_moment(new Date()).format('ss')) > 0
      && String(_moment(new Date()).format('a')) == 'am') {
      window.location.replace(window.location.href);
    }
  }


  onRightClick($event) {
    return false;
  }
}
