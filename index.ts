import { ModuleWithProviders, NgModule } from '@angular/core';
import { EventBus } from './src/event/event-bus';

export * from './src/event/event';
export * from './src/event/done-event';
export * from './src/event/refresh-event';
export * from './src/event/event-handler';
export * from './src/event/handler-registration';
export * from './src/event/event-bus';
export * from './src/pluginbus/plugin-bus';
export * from './src/widget/widget-view';

@NgModule()
export class MirrorModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MirrorModule,
      providers: [EventBus],
    };
  }
}
