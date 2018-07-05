/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import MapView = require("esri/views/MapView");
import WebMap = require("esri/WebMap");

import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import PortalQueryParams = require("esri/portal/PortalQueryParams");

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");

interface WebMapShowcaseProperties {
  view: MapView;

  portal?: Portal;
  webMapGroupId?: string;
}

@subclass("esri.widgets.WebMapShowcase")
class WebMapShowcase extends declared(Accessor) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: WebMapShowcaseProperties) {
    super();
  }

  initialize() {
    this._fetchWebMaps()
      .then((results) => {
        this._set("webMaps", results);
        this._setActive(results[0]); // set first as `active`
      });
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  active
  //----------------------------------

  @property({ readOnly: true })
  readonly active: PortalItem = null;

  //----------------------------------
  //  portal
  //----------------------------------

  @property() portal: Portal = Portal.getDefault();

  //----------------------------------
  //  webMapGroupId
  //----------------------------------

  @property() webMapGroupId: string = "a09a1595fd944f17a47a244e67d804f9";

  //----------------------------------
  //  webMaps
  //----------------------------------

  @property({ readOnly: true })
  readonly webMaps: PortalItem[] = null;

  //----------------------------------
  //  view
  //----------------------------------

  @property() view: MapView = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  next(): void {
    const { webMaps } = this;

    let index = webMaps.indexOf(this.active) + 1;

    if (index === webMaps.length) {
      index = 0;
    }

    this._setActive(webMaps[index]);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _fetchWebMaps(): IPromise<PortalItem[]> {
    const { portal, webMapGroupId } = this;
    const webMapsFromGroupQuery = `group:${webMapGroupId} AND type:"Web Map" AND -type:"Web Mapping Application"`;

    return portal
      .load()
      .then(() => portal.queryItems(new PortalQueryParams({ query: webMapsFromGroupQuery })))
      .then((queryResults) => queryResults.results);
  }

  private _setActive(portalItem: PortalItem): void {
    const { view } = this;

    this._set("active", portalItem);

    const webMap = new WebMap({ portalItem });

    webMap.when(() => (view.viewpoint = webMap.initialViewProperties.viewpoint));

    view.map = webMap as any;
  }
}

export = WebMapShowcase;
