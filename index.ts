import { ModuleWithProviders, NgModule } from '@angular/core';
import { EventBus } from './src/event/event-bus';
import { TruncateCharactersPipe } from './src/pipe/truncate-characters.pipe';
import { AlertService } from './src/service/alert.service';
import { DateUtils } from './src/service/date-util.service';
import { EventManager } from './src/service/event-manager.service';
import { ProxyService } from './src/service/proxy.service';

export * from './src/event/event';
export * from './src/event/done-event';
export * from './src/event/refresh-event';
export * from './src/event/event-handler';
export * from './src/event/handler-registration';
export * from './src/event/event-bus';
export * from './src/pipe/truncate-characters.pipe';
export * from './src/pluginbus/plugin-bus';
export * from './src/service/alert.service';
export * from './src/service/date-util.service';
export * from './src/service/event-manager.service';
export * from './src/service/proxy.service';
export * from './src/widget/widget-view';

@NgModule({
  declarations: [
    TruncateCharactersPipe
  ],
  exports: [
    TruncateCharactersPipe
  ]
})
export class MirrorPluginModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MirrorPluginModule,
      providers: [EventBus, AlertService, DateUtils, EventManager, ProxyService],
    };
  }
}
