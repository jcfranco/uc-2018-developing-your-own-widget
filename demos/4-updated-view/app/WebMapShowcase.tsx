/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");

import { property, declared, subclass } from "esri/core/accessorSupport/decorators";

import { renderable, tsx } from "esri/widgets/support/widget";

@subclass("esri.demo.WebMapShowcase")
class WebMapShowcase extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return <div class="custom-widget">Hello World</div>;
  }
}

export = WebMapShowcase;
