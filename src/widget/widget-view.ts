import { ElementRef, OnDestroy, OnInit } from '@angular/core';

export interface WidgetView {
  position: string;
  maximized: boolean;
  nativeElement(): HTMLElement;
  onMaximized(): void;
  onMinimized(): void;
}

export abstract class AbstractWidgetView implements OnInit, OnDestroy, WidgetView {

  public position: string;
  private _maximized: boolean;

  constructor(private _el: ElementRef) {
    this.position = 'center';
    this._maximized = true;
  }

  public ngOnInit(): void {
    // default implementation
  }

  public ngOnDestroy(): void {
    // default implementation
  }

  public nativeElement(): HTMLElement {
    return this._el.nativeElement;
  }

  public get maximized(): boolean {
    return this._maximized;
  }

  public set maximized(value: boolean) {
    console.log('[widget-view] maximized ' + value);
    if (value === this._maximized) {
      return;
    }

    this._maximized = value;
    if (this._maximized) {
      this.onMaximized();
    } else {
      this.onMinimized();
    }
  }

  public onMaximized(): void {
    // default implementation
  }

  public onMinimized(): void {
    // default implementation
  }

}
