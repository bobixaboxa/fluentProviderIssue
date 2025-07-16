import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';


import { FluentProvider, FluentProviderProps, teamsDarkTheme, teamsLightTheme, webLightTheme, webDarkTheme, Theme, IdPrefixProvider } from '@fluentui/react-components';
import { AppMode } from '../../webparts/fluentUi9Demo/FluentUi9DemoWebPart'
import { IFluentUi9DemoProps } from './components/IFluentUi9DemoProps'
import FluentUi9Demo from './components/HelloWorld'



export default class HelloWorldFormCustomizer extends BaseFormCustomizer<{}> {

  private _isDarkTheme: boolean = false;
   private _appMode: AppMode = AppMode.SharePoint;
   private _theme: Theme = webLightTheme;
 
   protected async onInit(): Promise<void> {
     const _l = this.context.isServedFromLocalhost;
      this._appMode = _l ? AppMode.SharePointLocal : AppMode.SharePoint;
     return super.onInit();
   }
 
   public render(): void {
     const element: React.ReactElement<IFluentUi9DemoProps> = React.createElement(
       FluentUi9Demo,
       {
         isDarkTheme: this._isDarkTheme,
         userDisplayName: this.context.pageContext.user.displayName,
         context: this.context,
         appMode: this._appMode
       }
     );
 
     //wrap the component with the Fluent UI 9 Provider.
     const fluentElement: React.ReactElement<FluentProviderProps> = React.createElement(
       FluentProvider,
       {
         theme: this._appMode === AppMode.Teams || this._appMode === AppMode.TeamsLocal ?
           this._isDarkTheme ? teamsDarkTheme : teamsLightTheme :
           this._appMode === AppMode.SharePoint || this._appMode === AppMode.SharePointLocal ?
             this._isDarkTheme ? webDarkTheme : this._theme :
             this._isDarkTheme ? webDarkTheme : webLightTheme
       },
       element
     );
     

    const idPrefixProvider: React.ReactElement = React.createElement(
      IdPrefixProvider,
      { value: 'aricoma-' },
      fluentElement
    )
 
     ReactDOM.render(idPrefixProvider, this.domElement);
  }

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }
}
