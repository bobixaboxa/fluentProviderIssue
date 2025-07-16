
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility'
import { AppMode } from '../../../webparts/fluentUi9Demo/FluentUi9DemoWebPart'

export interface IFluentUi9DemoProps {
  isDarkTheme: boolean;
  userDisplayName: string;
  context: FormCustomizerContext;
  appMode: AppMode
}
