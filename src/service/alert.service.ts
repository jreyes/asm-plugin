import { Injectable, Sanitizer, SecurityContext } from '@angular/core';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
  id?: number;
  type: AlertType;
  msg: string;
  params?: any;
  timeout?: number;
  toast?: boolean;
  position?: string;
  scoped?: boolean;
  close?: (alerts: Alert[]) => void;
}

@Injectable()
export class AlertService {

  private alertId: number;
  private alerts: Alert[];
  private timeout: number;

  constructor(private sanitizer: Sanitizer,
              private toast?: boolean) {
    this.alertId = 0; // unique id for each alert. Starts from 0.
    this.alerts = [];
    this.timeout = 5000; // default timeout in milliseconds
  }

  public clear() {
    this.alerts.splice(0, this.alerts.length);
  }

  public get(): Alert[] {
    return this.alerts;
  }

  public success(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'success',
      msg,
      params,
      timeout: this.timeout,
      toast: this.toast,
      position
    }, []);
  }

  public error(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'danger',
      msg,
      params,
      timeout: this.timeout,
      toast: this.toast,
      position
    }, []);
  }

  public warning(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'warning',
      msg,
      params,
      timeout: this.timeout,
      toast: this.toast,
      position
    }, []);
  }

  public info(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'info',
      msg,
      params,
      timeout: this.timeout,
      toast: this.toast,
      position
    }, []);
  }

  public addAlert(alertOptions: Alert, extAlerts: Alert[]): Alert {
    alertOptions.id = this.alertId++;
    let alert = this.factory(alertOptions);
    if (alertOptions.timeout && alertOptions.timeout > 0) {
      setTimeout(() => {
        this.closeAlert(alertOptions.id, extAlerts);
      }, alertOptions.timeout);
    }
    return alert;
  }

  public closeAlert(id: number, extAlerts?: Alert[]): any {
    let thisAlerts: Alert[] = (extAlerts && extAlerts.length > 0) ? extAlerts : this.alerts;
    return this.closeAlertByIndex(thisAlerts.map((e) => e.id).indexOf(id), thisAlerts);
  }

  public closeAlertByIndex(index: number, thisAlerts: Alert[]): Alert[] {
    return thisAlerts.splice(index, 1);
  }

  public isToast(): boolean {
    return this.toast;
  }

  private factory(alertOptions: Alert): Alert {
    let alert: Alert = {
      type: alertOptions.type,
      msg: this.sanitizer.sanitize(SecurityContext.HTML, alertOptions.msg),
      id: alertOptions.id,
      timeout: alertOptions.timeout,
      toast: alertOptions.toast,
      position: alertOptions.position ? alertOptions.position : 'top right',
      scoped: alertOptions.scoped,
      close: (alerts: Alert[]) => {
        return this.closeAlert(alertOptions.id, alerts);
      }
    };
    if (!alert.scoped) {
      this.alerts.push(alert);
    }
    return alert;
  }
}
