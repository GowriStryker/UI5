/*
*&*********************************************************************&*
*& File         : View1.controller.js                                  &*
*& Company      : Stryker Project Accelerate - R5 - MEDICAL            &*
*& Author       : Gowrinath                                            &*
*& Date         : 06/12/2022                                           &*
*& Title        : Create WRICEF ID                                     &*
*& FD #         : DEV.RPT.002                                          &*
*&*********************************************************************&*
*& DESCRIPTION  : Create WRICEF ID View1                               &*
*&*********************************************************************&*
*& H I S T O R Y       O F       R E V I S I O N S &                   &*
*&*********************************************************************&*
*& DATE        AUTHOR   DESCRIPTION OF CHANGE        Request #  Vers.  &*
*& 06/12/2022  GGUNDU   Initial RICEF                FI1K900236        &*
*&*********************************************************************&*

*/

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/Dialog", "sap/ui/model/Filter", "sap/m/MessageBox",
	"sap/ui/core/Fragment", "sap/ui/model/json/JSONModel", "sap/ui/model/FilterOperator", "root/util/formatter"
], function (e, t, i, s, a, l, r, E, u) {
	"use strict";
	return e.extend("root.controller.View1", {
		formatter: u,
		onAfterRendering: function () {
			if (!sap.ui.Device.system.desktop) {
				this.getView().byId("table").getColumns()[1].setVisible(false);
				this.getView().byId("table").getColumns()[3].setVisible(false);
				this.getView().byId("table").getColumns()[4].setVisible(false);
				this.getView().byId("table").getColumns()[5].setVisible(false)
			}
		},
		onInit: function () {
			var e = new r(this.settingsModel);
			this.getView().setModel(e);
			var t = this.getOwnerComponent().getModel("Data");
			this.getView().setModel(t, "test");
			var i = this;
			var s = this.getOwnerComponent().getModel("complexityModel");
			this.getView().setModel(s, "complexityModel");
			this.valueHelpModel = this.getOwnerComponent().getModel("searchHelp");
			this.valueHelpModel.read("/RICEF_MASTERSet", {
				success: function (e) {
					var t = new sap.ui.model.json.JSONModel(e);
					this.getView().setModel(t, "searchData");
					var s = [];
					var a = [];
					var l = [];
					var r = [];
					var E = [];
					var u = [];
					var d = [];
					var g = [];
					var o = [];
					var n = [];
					var I = [];
					var V = [];
					var h = [];
					var R = [];
					var b = [];
					var S = [];
					var T = [];
					this.total = e.results.length;
					for (var w = 0; w < this.total; w++) {
						var y = e.results[w].RICEF.indexOf("-01");
						if (y !== -1) {
							S.push(e.results[w].RICEF)
						}
						V.push(e.results[w].SRCSYS);
						b.push(e.results[w].TARGET_SYSTEM);
						l.push(e.results[w].TEAM);
						r.push(e.results[w].GRP);
						E.push(e.results[w].TYPE);
						u.push(e.results[w].OBJTYP);
						a.push(e.results[w].RICEF);
						var c = e.results[w].RICEF + "//" + e.results[w].TEAM;
						I.push(c)
					}
					S = this.removeDuplicates(S);
					l = this.removeDuplicates(l);
					r = this.removeDuplicates(r);
					E = this.removeDuplicates(E);
					u = this.removeDuplicates(u);
					a = this.removeDuplicates(a);
					I = this.removeDuplicates(I);
					V = this.removeDuplicates(V);
					b = this.removeDuplicates(b);
					for (w = 0; w < l.length; w++) {
						var f = {};
						f.value = l[w];
						f.count = 0;
						n.push(f)
					}
					for (w = 0; w < a.length; w++) {
						f = {};
						f.value = a[w];
						s.push(f)
					}
					var p = [];
					for (w = 0; w < I.length; w++) {
						f = {};
						var P = I[w].toString().split("//");
						f.ricef = P[0];
						f.team = P[1];
						p.push(f)
					}
					for (w = 0; w < S.length; w++) {
						f = {};
						f.value = S[w];
						T.push(f)
					}
					for (w = 0; w < p.length; w++) {
						for (var C = 0; C < n.length; C++) {
							if (n[C].value == p[w].team) {
								n[C].count = n[C].count + 1;
								break
							}
						}
					}
					for (w = 0; w < r.length; w++) {
						f = {};
						f.value = r[w];
						d.push(f)
					}
					for (w = 0; w < E.length; w++) {
						f = {};
						f.value = E[w];
						g.push(f)
					}
					for (w = 0; w < u.length; w++) {
						f = {};
						f.value = u[w];
						o.push(f)
					}
					for (w = 0; w < V.length; w++) {
						f = {};
						f.value = V[w];
						h.push(f)
					}
					for (w = 0; w < b.length; w++) {
						f = {};
						f.value = b[w];
						R.push(f)
					}
					var A = new sap.ui.model.json.JSONModel(n);
					i.getView().setModel(A, "trackHelp");
					var A = new sap.ui.model.json.JSONModel(h);
					i.getView().setModel(A, "sourceHelp");
					var A = new sap.ui.model.json.JSONModel(R);
					i.getView().setModel(A, "targetHelp");
					A = new sap.ui.model.json.JSONModel(d);
					i.getView().setModel(A, "subTrackHelp");
					A = new sap.ui.model.json.JSONModel(T);
					A.setSizeLimit(T.length);
					i.getView().setModel(A, "intHelp");
					A = new sap.ui.model.json.JSONModel(g);
					i.getView().setModel(A, "typeHelp");
					A = new sap.ui.model.json.JSONModel(o);
					i.getView().setModel(A, "subTypeHelp");
					A = new sap.ui.model.json.JSONModel(s);
					A.setSizeLimit(s.length);
					i.getView().setModel(A, "ricefsHelp")
				}.bind(this),
				error: function (e) {
					a.error(e.message, {
						details: e.responseText
					})
				}.bind(this)
			});
			this.valueHelpModel.read("/RELEASESet", {
				success: function (e, t) {
					var s = new sap.ui.model.json.JSONModel(e);
					s.iSizeLimit = 99999;
					i.getView().setModel(s, "releaseHelp");
					s.updateBindings(true);
					i.originalRelease = e
				},
				failed: function (e, t) {},
				abort: function (e, t) {}
			});
			this.valueHelpModel.read("/APPROVERSet", {
				success: function (e, t) {
					var s = new sap.ui.model.json.JSONModel(e);
					s.iSizeLimit = 99999;
					i.getView().setModel(s, "ISPOHelp");
					s.updateBindings(true)
				},
				failed: function (e, t) {},
				abort: function (e, t) {}
			})
		},
		onRefRicef: function (e) {
			var t = this.getView().byId("idRefRicef").getSelected().toString();
			if (t === "true") {
				this.getView().byId("REFERENCE_WRICEF").setEnabled(true)
			} else {
				this.getView().byId("REFERENCE_WRICEF").setEnabled(false)
			}
		},
		onOperationChange: function (e) {
			var t = e.getParameter("selectedIndex");
			if (t === 0) {
				this.getView().byId("F8").setText("Create WRICEF");
				this.enableFields(this);
				this.getView().getModel("releaseHelp").setData(this.originalRelease);
				this.getView().byId("RELEASE").setSelectedKeys(null);
				this.getView().byId("RELEASE").setEnabled(true);
				this.getView().byId("idWricef").setRequired(false)
			} else if (t === 1) {
				this.getView().byId("F8").setText("Extend WRICEF");
				this.disableFields(this);
				this.getView().byId("RELEASE").setEnabled(false);
				this.getView().byId("idWricef").setRequired(true)
			} else if (t === 2) {
				this.disableFields(this);
				this.getView().byId("F8").setText("Cancel WRICEF");
				this.getView().byId("RELEASE").setEnabled(true);
				this.getView().byId("RELEASE").setRequired(true);
				this.getView().byId("idWricef").setRequired(true)
			}
			this.clearFields();
			this.getView().byId("SOURCE_SYSTEM").setRequired(false);
			this.getView().byId("TARGET_SYSTEM").setRequired(false)
		},
		onSelect: function (e) {},
		onRadioButton: function (e) {
			if (e.getSource().getSelectedIndex() == 0) {
				this.getView().byId("form0").setVisible(false);
				this.getView().byId("F8").setText("Search");
				this.getView().byId("F8").setIcon("sap-icon://search");
				this.getView().byId("searchTerm").setVisible(true)
			} else {
				this.getView().byId("form0").setVisible(true);
				this.getView().byId("table").setVisible(false);
				this.getView().byId("F8").setText("Create WRICEF");
				this.getView().byId("F8").setIcon("sap-icon://create");
				this.getView().byId("searchTerm").setVisible(false)
			}
		},
		attachContentChange: function () {},
		onExtend: function (e) {
			var t = e.getSource().getSelected().toString();
			if (t === "true") {
				this.disableFields(this);
				this.getView().byId("RELEASE").setEnabled(false);
				this.getView().byId("idWricef").setRequired(true)
			} else {
				this.enableFields(this);
				this.getView().getModel("releaseHelp").setData(this.originalRelease);
				this.getView().byId("idWricef").setRequired(false)
			}
			this.clearFields();
			this.getView().byId("SOURCE_SYSTEM").setRequired(false);
			this.getView().byId("TARGET_SYSTEM").setRequired(false)
		},
		clearFields: function () {
			this.getView().byId("idWricef").setValue("");
			this.getView().byId("TRACK").setValue("");
			this.getView().byId("SUBTRACK").setValue("");
			this.getView().byId("DESCRIPTION").setValue("");
			this.getView().byId("WRICEF_TYPE").setValue("");
			this.getView().byId("REFERENCE_WRICEF").setValue("");
			this.getView().byId("WRICEF_SUBTYPE").setValue("");
			this.getView().byId("SAP_COMPLEXITY").setValue("");
			this.getView().byId("NONSAP_COMPLEXITY").setValue("");
			this.getView().byId("MW_COMPLEXITY").setValue("");
			this.getView().byId("CR").setValue("");
			this.getView().byId("RAID").setValue("");
			this.getView().byId("SOURCE_SYSTEM").setValue("");
			this.getView().byId("TARGET_SYSTEM").setValue("");
			this.getView().byId("BPO").setValue("");
			this.getView().byId("MIDDLEWARE_PATTERN").setValue("");
			this.getView().byId("DELIVERY_NOTES").setValue("");
			this.getView().byId("REQUIREMENT_ID").setValue("");
			this.getView().byId("RELEASE").setSelectedKeys(null)
		},
		onExtendWricef: function (e) {
			this.getView().byId("RELEASE").setSelectedKeys(); //GGUNDU
			var t = this.getView().byId("idOperation").getSelectedIndex();
			if (t === 1) {
				/*Begin of GGUNDU 21-12-2022*/
			    var n = this.getView().getModel("searchData").getData().results;
				var I = e.getParameter("value");
				for (d = 0; d < n.length; d++) {
					if (n[d].RICEF === I) {
						var V = n[d];
						break
					}
				}
				this.assignData(V);
				//End of GGUNDUU 21-12-2022
				this.getView().byId("RELEASE").setSelectedKeys(null);
				if (this.getView().byId("idWricef").getValue === "") {
					this.getView().byId("RELEASE").setEnabled(false)
				} else {
					this.getView().byId("RELEASE").setEnabled(true);
					this.getView().byId("idWricef").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("RELEASE").setValueState(sap.ui.core.ValueState.None);
					this.clearStatus(this)
				}
				var i = [];
				const t = this.originalRelease;
				var s = {};
				s.results = [];
				var a = 0;
				var l = t;
				var r = [];
				for (var E = 0; E < l.results.length; E++) {
					r.push(l.results[E].Release)
				}
				var u = this.getView().getModel("searchData").getData().results;
				for (var d = 0; d < u.length; d++) {
					if (u[d].RICEF === e.getParameter("value")) {
						i.push(u[d].REL)
					}
				}
				for (d = 0; d < i.length; d++) {
					var g = r.indexOf(i[d].toString());
					r.splice(g, 1)
				}
				for (d = 0; d < r.length; d++) {
					var o = {};
					o.Release = r[d];
					s.results.push(o)
				}
				this.getView().getModel("releaseHelp").setData(s)
			} else if (t === 2) {
				var n = this.getView().getModel("searchData").getData().results;
				var I = e.getParameter("value");
				for (d = 0; d < n.length; d++) {
					if (n[d].RICEF === I) {
						var V = n[d];
						break
					}
				}
				this.assignData(V);
				var i = [];
				const h = this.originalRelease;
				var s = {};
				s.results = [];
				var a = 0;
				var l = h;
				var r = [];
				for (var E = 0; E < l.results.length; E++) {
					r.push(l.results[E].Release)
				}
				var u = this.getView().getModel("searchData").getData().results;
				for (var d = 0; d < u.length; d++) {
					if (u[d].RICEF === e.getParameter("value")) {
						var o = {};
						o.Release = u[d].REL;
						s.results.push(o)
					}
				}
				this.getView().getModel("releaseHelp").setData(s)
			}

		},
		assignData: function (e) {
			debugger;
			this.getView().byId("TRACK").setValue(e.TEAM);
			this.getView().byId("SUBTRACK").setValue(e.GRP);
			this.getView().byId("DESCRIPTION").setValue(e.NAME);
			this.getView().byId("WRICEF_TYPE").setValue(e.TYPE);
			this.getView().byId("WRICEF_SUBTYPE").setValue(e.OBJTYP);
			this.getView().byId("SAP_COMPLEXITY").setValue(e.SAP_COMPLEXITY);
			this.getView().byId("NONSAP_COMPLEXITY").setValue(e.NONSAP_COMPLEXITY);
			this.getView().byId("MW_COMPLEXITY").setValue(e.MW_COMPLEXITY);
			this.getView().byId("CR").setValue(e.CR);
			this.getView().byId("RAID").setValue(e.RAID);
			this.getView().byId("SOURCE_SYSTEM").setValue(e.SRCSYS);
			this.getView().byId("TARGET_SYSTEM").setValue(e.TARGET_SYSTEM);
			this.getView().byId("BPO").setValue(e.BPO);
			this.getView().byId("MIDDLEWARE_PATTERN").setValue(e.MW_PATTERN);
			this.getView().byId("DELIVERY_NOTES").setValue(e.DELIVERY_NOTES)
		},
		disableFields: function (e) {
			e.getView().byId("idWricef").setEnabled(true);
			e.getView().byId("TRACK").setEnabled(false);
			e.getView().byId("SUBTRACK").setEnabled(false);
			e.getView().byId("DESCRIPTION").setEnabled(false);
			e.getView().byId("WRICEF_TYPE").setEnabled(false);
			e.getView().byId("REFERENCE_WRICEF").setEnabled(false);
			e.getView().byId("WRICEF_SUBTYPE").setEnabled(false);
			e.getView().byId("SAP_COMPLEXITY").setEnabled(false);
			e.getView().byId("NONSAP_COMPLEXITY").setEnabled(false);
			e.getView().byId("MW_COMPLEXITY").setEnabled(false);
			e.getView().byId("CR").setEnabled(false);
			e.getView().byId("RAID").setEnabled(false);
			e.getView().byId("SOURCE_SYSTEM").setEnabled(false);
			e.getView().byId("TARGET_SYSTEM").setEnabled(false);
			e.getView().byId("BPO").setEnabled(false);
			e.getView().byId("MIDDLEWARE_PATTERN").setEnabled(false);
			e.getView().byId("DELIVERY_NOTES").setEnabled(false);
			e.getView().byId("REQUIREMENT_ID").setEnabled(false);
			e.getView().byId("TRACK").setRequired(false);
			e.getView().byId("SUBTRACK").setRequired(false);
			e.getView().byId("DESCRIPTION").setRequired(false);
			e.getView().byId("WRICEF_TYPE").setRequired(false);
			e.getView().byId("REFERENCE_WRICEF").setRequired(false);
			e.getView().byId("WRICEF_SUBTYPE").setRequired(false);
			e.getView().byId("SAP_COMPLEXITY").setRequired(false);
			e.getView().byId("NONSAP_COMPLEXITY").setRequired(false);
			e.getView().byId("MW_COMPLEXITY").setRequired(false);
			e.getView().byId("RELEASE").setRequired(true);
			e.getView().byId("idWricef").setRequired(true)
		},
		enableFields: function (e) {
			e.getView().byId("idWricef").setEnabled(false);
			e.getView().byId("TRACK").setEnabled(true);
			e.getView().byId("SUBTRACK").setEnabled(true);
			e.getView().byId("DESCRIPTION").setEnabled(true);
			e.getView().byId("WRICEF_TYPE").setEnabled(true);
			e.getView().byId("REFERENCE_WRICEF").setEnabled(true);
			e.getView().byId("WRICEF_SUBTYPE").setEnabled(true);
			e.getView().byId("SAP_COMPLEXITY").setEnabled(true);
			e.getView().byId("NONSAP_COMPLEXITY").setEnabled(true);
			e.getView().byId("MW_COMPLEXITY").setEnabled(true);
			e.getView().byId("CR").setEnabled(true);
			e.getView().byId("RAID").setEnabled(true);
			e.getView().byId("SOURCE_SYSTEM").setEnabled(true);
			e.getView().byId("TARGET_SYSTEM").setEnabled(true);
			e.getView().byId("BPO").setEnabled(true);
			e.getView().byId("MIDDLEWARE_PATTERN").setEnabled(true);
			e.getView().byId("DELIVERY_NOTES").setEnabled(true);
			e.getView().byId("REQUIREMENT_ID").setEnabled(true);
			e.getView().byId("TRACK").setRequired(true);
			e.getView().byId("SUBTRACK").setRequired(true);
			e.getView().byId("DESCRIPTION").setRequired(true);
			e.getView().byId("WRICEF_TYPE").setRequired(true);
			e.getView().byId("WRICEF_SUBTYPE").setRequired(true);
			e.getView().byId("SAP_COMPLEXITY").setRequired(true);
			e.getView().byId("NONSAP_COMPLEXITY").setRequired(true);
			e.getView().byId("MW_COMPLEXITY").setRequired(true);
			e.getView().byId("RELEASE").setRequired(true);
			e.getView().byId("idWricef").setRequired(true)
		},
		removeDuplicatesSpecial: function (e) {
			var t = [];
			for (var i = 0; i < e.length; i++) {
				if (e.indexOf(e[i].ricefTeam) === i) {
					t.push(e[i])
				}
			}
			return t
		},
		removeDuplicates: function (e) {
			var t = [];
			for (var i = 0; i < e.length; i++) {
				if (e.indexOf(e[i]) === i) {
					t.push(e[i])
				}
			}
			return t
		},
		wricefPopover: function (e) {
			var t = this.getView();
			var i = e.getSource();
			var s = e.getSource().getBindingContextPath("searchData").split("/");
			var a = s[2];
			var E = e.getSource().getParent().getModel("searchData").getData().results[a];
			this.oTextModel = new r(E);
			if (!this._pPopover2) {
				this._pPopover2 = l.load({
					id: t.getId(),
					name: "root.fragments.wricefDetail",
					controller: "root.controller.View1"
				}).then(function (e) {
					t.addDependent(e);
					return e
				})
			}
			this._pPopover2.then(function (e) {
				e.setModel(this.oTextModel);
				e.openBy(i)
			}.bind(this))
		},
		onPressOpenPopover: function (e) {
			var t = this.getView(),
				i = e.getSource();
			if (!this._pPopover) {
				this._pPopover = l.load({
					id: t.getId(),
					name: "root.fragments.card"
				}).then(function (e) {
					t.addDependent(e);
					return e
				})
			}
			this.getView().byId("idChart").setVizProperties({
				plotArea: {
					dataLabel: {
						visible: true,
						showTotal: true
					}
				}
			});
			this._pPopover.then(function (e) {
				e.openBy(i)
			})
		},
		onValueChange: function (e) {
			if (e.getSource().getParent().getAggregation("label") === "WRICEF Type") {
				if (e.getSource().getProperty("value") === "Interface") {
					this.getView().byId("idReference").setVisible(true);
					this.getView().byId("SOURCE_SYSTEM").setRequired(true);
					this.getView().byId("TARGET_SYSTEM").setRequired(true);
					this.getView().byId("SOURCE_SYSTEM").setEditable(true);
					this.getView().byId("TARGET_SYSTEM").setEditable(true)
				} else {
					this.getView().byId("idReference").setVisible(false);
					this.getView().byId("SOURCE_SYSTEM").setEditable(false);
					this.getView().byId("TARGET_SYSTEM").setEditable(false);
					this.getView().byId("SOURCE_SYSTEM").setValue("");
					this.getView().byId("TARGET_SYSTEM").setValue("")
				}
			}
			var t = e.getSource();
			var i = t.getItems().length;
			var s = t.getValue();
			var a = false;
			for (var l = 0; l < i; l++) {
				var r = t.getItems()[l].getProperty("text");
				if (r === s) {
					a = true;
					break
				}
			}
			if (a) {
				t.setValueState(sap.ui.core.ValueState.None);
				this.clearStatus(this)
			} else {
				t.setValueState(sap.ui.core.ValueState.Error);
				t.setValue("");
				this.getView().byId("statusText").setText("<strong>Invalid Input </strong>. Select a value from dropdown list");
				this.getView().byId("statusText").setType("Error");
				this.getView().byId("statusText").setVisible(true);
				this.submitValidation = false
			}
		},
		onSubmit: function () {
			var e = {};
			if (this.getView().byId("radioGroup").getSelectedIndex() == 1) {
				if (this.getView().byId("F8").getText() === "Create WRICEF") {
					if (this.getView().byId("statusText").getProperty("text").length !== 0 && this.submitValidation !== true) {
						return
					}
					this.submitValidation = false;
					this.getView().byId("statusText").setText("");
					e.REQUESTOR_NAME = sap.ushell.Container.getUser().getFullName();
					e.REQUESTOR_EMAIL = sap.ushell.Container.getUser().getEmail();
					e.TEAM = this.getView().byId("TRACK").getValue();
					e.GRP = this.getView().byId("SUBTRACK").getValue();
					e.NAME = this.getView().byId("DESCRIPTION").getValue();
					e.REL = "";
					var t = this.getView().byId("RELEASE").getSelectedKeys();
					for (var i = 0; i < t.length; i++) {
						if (i == t.length - 1) {
							e.REL = e.REL.concat(t[i])
						} else {
							e.REL = e.REL.concat(t[i]).concat("|")
						}
					}
					e.TYPE = this.getView().byId("WRICEF_TYPE").getValue();
					e.OBJTYP = this.getView().byId("WRICEF_SUBTYPE").getValue();
					e.REFERENCE_WRICEF = this.getView().byId("REFERENCE_WRICEF").getValue();
					e.SAP_COMPLEXITY = this.getView().byId("SAP_COMPLEXITY").getValue();
					e.NON_SAP_COMPLEXITY = this.getView().byId("NONSAP_COMPLEXITY").getValue();
					e.MW_COMPLEXITY = this.getView().byId("MW_COMPLEXITY").getValue();
					e.CR = this.getView().byId("CR").getValue();
					e.RAID = this.getView().byId("RAID").getValue();
					e.SRCSYS = this.getView().byId("SOURCE_SYSTEM").getValue();
					e.TARGET_SYSTEM = this.getView().byId("TARGET_SYSTEM").getValue();
					e.BPO = this.getView().byId("BPO").getValue();
					e.MW_PATTERN = this.getView().byId("MIDDLEWARE_PATTERN").getValue();
					e.DELIVERY_NOTES = this.getView().byId("DELIVERY_NOTES").getValue();
					e.REQUIREMENT_ID = this.getView().byId("REQUIREMENT_ID").getValue();
					e.IS_APPROVER = this.getView().byId("IS_APPROVER").getValue();
					e.REQUEST_CREATEDBY = sap.ushell.Container.getService("UserInfo").getId();
					e.TECH_APPROVAL = "PENDING";
					e.IS_APPROVAL = "PENDING";
					e.MW_APPROVAL = "PENDING";
					if (this.getView().byId("idRefRicef").getSelected().toString() === "false") {
						e.EXISTING_INTERFACE = " "
					} else {
						e.EXISTING_INTERFACE = "X"
					}
					e.APP_NUM = 1;
					e.SERVICE_CALLER = "CREATE";
					var s = this.getView().byId("SOURCE_SYSTEM").getValue();
					var l = this.getView().byId("TARGET_SYSTEM").getValue();
					if (s !== "" && l !== "") {
						var r = this.getView().getModel("sourceHelp").getData();
						e.srcflag = "X";
						e.TARGETFLAG = "X";
						for (i = 0; i < r.length; i++) {
							if (r[i].value === s) {
								e.srcflag = ""
							}
							if (r[i].value === l) {
								e.TARGETFLAG = ""
							}
						}
					}
					this.getView().byId("TRACK").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("SUBTRACK").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("DESCRIPTION").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("RELEASE").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("WRICEF_TYPE").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("WRICEF_SUBTYPE").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("IS_APPROVER").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("SOURCE_SYSTEM").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("TARGET_SYSTEM").setValueState(sap.ui.core.ValueState.None);
					this.clearStatus(this);
					if (e.TEAM === "") {
						this.getView().byId("TRACK").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.GRP === "") {
						this.getView().byId("SUBTRACK").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.NAME === "") {
						this.getView().byId("DESCRIPTION").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.REL === "") {
						this.getView().byId("RELEASE").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.TYPE === "") {
						this.getView().byId("WRICEF_TYPE").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.OBJTYPE === "") {
						this.getView().byId("WRICEF_SUBTYPE").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.TYPE == "Interface" && this.getView().byId("SOURCE_SYSTEM").getValue() == "") {
						this.getView().byId("SOURCE_SYSTEM").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.TYPE == "Interface" && this.getView().byId("TARGET_SYSTEM").getValue() == "") {
						this.getView().byId("TARGET_SYSTEM").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else if (e.IS_APPROVER === "") {
						this.getView().byId("IS_APPROVER").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					}
					if (this.getView().byId("statusText").getProperty("text").length == 0) {
						var E = this.getView().getModel("ISPOHelp").getData().results;
						var u = "";
						var d = "<p><strong>Tech.  Approvers  </strong> (Any one can approve) : </p>\n <ul>";
						for (i = 0; i < E.length; i++) {
							if (E[i].OWNERSHIP == "TECHNICAL") {
								d = d.concat("<li>" + E[i].NAME + "</li>")
							}
							if (E[i].OWNERSHIP == "FUNCTIONAL") {
								if (E[i].USER_ID == e.IS_APPROVER) {
									u = E[i].NAME
								}
							}
						}
						d = d.concat("</ul><p><strong>IS Approver : </strong></p>\n <ul>");
						d = d.concat("<li>" + u + "</li></ul>");
						a.confirm("WRICEF ID creation request will be sent to Technical & Functional owners for approval. Continue ?", {
							actions: [a.Action.OK, a.Action.CANCEL],
							emphasizedAction: a.Action.OK,
							details: d,
							onClose: function (t) {
								if (t === "OK") {
									this.busyDialog = new sap.m.BusyDialog({});
									this.busyDialog.open();
									this.valueHelpModel.create("/SUBMIT_REQUESTSet", e, {
										success: function (e) {
											this.busyDialog.close();
											a.success(
												"Request sent to approvers. You will recieve an E-mail with your Request ID & a link to Track your request status."
											)
										}.bind(this),
										error: function (e) {
											this.busyDialog.close();
											a.error(e.message, {
												details: e.responseText
											})
										}.bind(this)
									})
								}
							}.bind(this)
						})
					}
				} else if (this.getView().byId("F8").getText() === "Extend WRICEF") {
					e.REL = "";
					e.WRICEF_ID = "";
					e.REQUESTOR_NAME = sap.ushell.Container.getUser().getFullName();
					e.REQUESTOR_EMAIL = sap.ushell.Container.getUser().getEmail();
					e.TEAM = this.getView().byId("TRACK").getValue();
					e.GRP = this.getView().byId("SUBTRACK").getValue();
					e.NAME = this.getView().byId("DESCRIPTION").getValue();
					e.REL = "";
					var t = this.getView().byId("RELEASE").getSelectedKeys();
					for (var i = 0; i < t.length; i++) {
						if (i == t.length - 1) {
							e.REL = e.REL.concat(t[i])
						} else {
							e.REL = e.REL.concat(t[i]).concat("|")
						}
					}
					e.TYPE = this.getView().byId("WRICEF_TYPE").getValue();
					e.OBJTYP = this.getView().byId("WRICEF_SUBTYPE").getValue();
					e.SAP_COMPLEXITY = this.getView().byId("SAP_COMPLEXITY").getValue();
					e.NON_SAP_COMPLEXITY = this.getView().byId("NONSAP_COMPLEXITY").getValue();
					e.MW_COMPLEXITY = this.getView().byId("MW_COMPLEXITY").getValue();
					e.CR = this.getView().byId("CR").getValue();
					e.RAID = this.getView().byId("RAID").getValue();
					e.SRCSYS = this.getView().byId("SOURCE_SYSTEM").getValue();
					e.TARGET_SYSTEM = this.getView().byId("TARGET_SYSTEM").getValue();
					e.BPO = this.getView().byId("BPO").getValue();
					e.MW_PATTERN = this.getView().byId("MIDDLEWARE_PATTERN").getValue();
					e.DELIVERY_NOTES = this.getView().byId("DELIVERY_NOTES").getValue();
					e.IS_APPROVER = this.getView().byId("IS_APPROVER").getValue();
					e.REQUEST_CREATEDBY = sap.ushell.Container.getService("UserInfo").getId();
					e.TECH_APPROVAL = "PENDING";
					e.IS_APPROVAL = "PENDING";
					e.MW_APPROVAL = "PENDING";
					this.clearStatus(this);
					e.IS_APPROVER = this.getView().byId("IS_APPROVER").getValue();
					var g = this.getView().byId("idWricef").getValue();
					if (g === "") {
						this.getView().byId("idWricef").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this);
						this.getView().byId("RELEASE").setEnabled(false)
					} else {
						this.clearStatus(this);
						this.getView().byId("idWricef").setValueState(sap.ui.core.ValueState.None)
					}
					t = this.getView().byId("RELEASE").getSelectedKeys();
					if (t.length === 0) {
						this.getView().byId("RELEASE").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					} else {
						this.clearStatus(this);
						this.getView().byId("RELEASE").setValueState(sap.ui.core.ValueState.None)
					}
					if (e.IS_APPROVER === "") {
						this.getView().byId("IS_APPROVER").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this)
					}
					e.REL = "";
					var t = this.getView().byId("RELEASE").getSelectedKeys();
					for (var i = 0; i < t.length; i++) {
						if (i == t.length - 1) {
							e.REL = e.REL.concat(t[i])
						} else {
							e.REL = e.REL.concat(t[i]).concat("|")
						}
					}
					e.WRICEF_ID = this.getView().byId("idWricef").getValue();
					e.APP_NUM = 1;
					e.SERVICE_CALLER = "EXTEND";
					if (this.getView().byId("statusText").getText().length == 0) {
						var E = this.getView().getModel("ISPOHelp").getData().results;
						var u = "";
						var d = "<p><strong>Tech.  Approvers  </strong> (Any one can approve) : </p>\n <ul>";
						for (i = 0; i < E.length; i++) {
							if (E[i].OWNERSHIP == "TECHNICAL") {
								d = d.concat("<li>" + E[i].NAME + "</li>")
							}
							if (E[i].OWNERSHIP == "FUNCTIONAL") {
								if (E[i].USER_ID == e.IS_APPROVER) {
									u = E[i].NAME
								}
							}
						}
						d = d.concat("</ul><p><strong>IS Approver : </strong></p>\n <ul>");
						d = d.concat("<li>" + u + "</li></ul>");
						a.confirm("WRICEF ID extension request will be sent to Technical & Functional owners for approval. Continue ?", {
							actions: [a.Action.OK, a.Action.CANCEL],
							emphasizedAction: a.Action.OK,
							details: d,
							onClose: function (t) {
								if (t === "OK") {
									this.busyDialog = new sap.m.BusyDialog({});
									this.busyDialog.open();
									this.valueHelpModel.create("/SUBMIT_REQUESTSet", e, {
										success: function (e) {
											this.busyDialog.close();
											a.success(
												"Request sent to approvers. You will recieve an E-mail with your Request ID & a link to Track your request status."
											)
										}.bind(this),
										error: function (e) {
											this.busyDialog.close();
											a.error(e.message, {
												details: e.responseText
											})
										}.bind(this)
									})
								}
							}.bind(this)
						})
					}
					
				} else if (this.getView().byId("F8").getText() === "Cancel WRICEF") {
					e.WRICEF_ID = "";
					e.APP_NUM = 1;
					e.WRICEF_ID = this.getView().byId("idWricef").getValue();
					e.REL = "";
					e.REQUESTOR_NAME = sap.ushell.Container.getUser().getFullName();
					e.REQUESTOR_EMAIL = sap.ushell.Container.getUser().getEmail();
					e.TEAM = this.getView().byId("TRACK").getValue();
					e.GRP = this.getView().byId("SUBTRACK").getValue();
					e.NAME = this.getView().byId("DESCRIPTION").getValue();
					
					var t = this.getView().byId("RELEASE").getSelectedKeys();
					for (var i = 0; i < t.length; i++) {
						if (i == t.length - 1) {
							e.REL = e.REL.concat(t[i])
						} else {
							e.REL = e.REL.concat(t[i]).concat("|")
						}
					}
					this.clearStatus(this);
					e.IS_APPROVER = this.getView().byId("IS_APPROVER").getValue();
					e.SERVICE_CALLER = "CANCEL";
					e.TYPE = this.getView().byId("WRICEF_TYPE").getValue();
					e.OBJTYP = this.getView().byId("WRICEF_SUBTYPE").getValue();
					e.SAP_COMPLEXITY = this.getView().byId("SAP_COMPLEXITY").getValue();
					e.NON_SAP_COMPLEXITY = this.getView().byId("NONSAP_COMPLEXITY").getValue();
					e.MW_COMPLEXITY = this.getView().byId("MW_COMPLEXITY").getValue();
					e.CR = this.getView().byId("CR").getValue();
					e.RAID = this.getView().byId("RAID").getValue();
					e.SRCSYS = this.getView().byId("SOURCE_SYSTEM").getValue();
					e.TARGET_SYSTEM = this.getView().byId("TARGET_SYSTEM").getValue();
					e.BPO = this.getView().byId("BPO").getValue();
					e.MW_PATTERN = this.getView().byId("MIDDLEWARE_PATTERN").getValue();
					e.DELIVERY_NOTES = this.getView().byId("DELIVERY_NOTES").getValue();
					e.IS_APPROVER = this.getView().byId("IS_APPROVER").getValue();
					e.REQUEST_CREATEDBY = sap.ushell.Container.getService("UserInfo").getId();
					e.TECH_APPROVAL = "PENDING";
					e.IS_APPROVAL = "PENDING";
					e.MW_APPROVAL = "PENDING";
					var g = this.getView().byId("idWricef").getValue();
					if (g === "") {
						this.getView().byId("idWricef").setValueState(sap.ui.core.ValueState.Error);
						this.mandatoryError(this);
						this.getView().byId("RELEASE").setEnabled(false)
					} else {
						this.clearStatus(this);
						this.getView().byId("idWricef").setValueState(sap.ui.core.ValueState.None)
					}
					/* Begin of GGUNDU DEV.RPT.002 24/11/2022*/
					if (this.getView().byId("statusText").getText().length == 0) {
						var E = this.getView().getModel("ISPOHelp").getData().results;
						var u = "";
						var d = "<p><strong>Tech.  Approvers  </strong> (Any one can approve) : </p>\n <ul>";
						for (i = 0; i < E.length; i++) {
							if (E[i].OWNERSHIP == "TECHNICAL") {
								d = d.concat("<li>" + E[i].NAME + "</li>")
							}
							if (E[i].OWNERSHIP == "FUNCTIONAL") {
								if (E[i].USER_ID == e.IS_APPROVER) {
									u = E[i].NAME
								}
							}
						}
						d = d.concat("</ul><p><strong>IS Approver : </strong></p>\n <ul>");
						d = d.concat("<li>" + u + "</li></ul>");
						a.confirm("WRICEF ID cancellation request will be sent to Technical & Functional owners for approval. Continue ?", {
							actions: [a.Action.OK, a.Action.CANCEL],
							emphasizedAction: a.Action.OK,
							details: d,
							onClose: function (t) {
								if (t === "OK") {
									this.busyDialog = new sap.m.BusyDialog({});
									this.busyDialog.open();
									this.valueHelpModel.create("/SUBMIT_REQUESTSet", e, {
										success: function (e) {
											this.busyDialog.close();
											a.success(
												"Request sent to approvers. You will recieve an E-mail with your Request ID & a link to Track your request status."
											)
										}.bind(this),
										error: function (e) {
											this.busyDialog.close();
											a.error(e.message, {
												details: e.responseText
											})
										}.bind(this)
									})
								}
							}.bind(this)
						})
					}
					/* End of of GGUNDU DEV.RPT.002 24/11/2022*/
				}
				//Begin of GGUNDU DEV.RPT.002 24/11/2022
				//Comment below code as it is wrongly placed. Moved to above block
				// if (this.getView().byId("statusText").getText().length == 0) {
				// 	var E = this.getView().getModel("ISPOHelp").getData().results;
				// 	var u = "";
				// 	var d = "<p><strong>Tech.  Approvers  </strong> (Any one can approve) : </p>\n <ul>";
				// 	for (i = 0; i < E.length; i++) {
				// 		if (E[i].OWNERSHIP == "TECHNICAL") {
				// 			d = d.concat("<li>" + E[i].NAME + "</li>")
				// 		}
				// 		if (E[i].OWNERSHIP == "FUNCTIONAL") {
				// 			if (E[i].USER_ID == e.IS_APPROVER) {
				// 				u = E[i].NAME
				// 			}
				// 		}
				// 	}
				// 	d = d.concat("</ul><p><strong>IS Approver : </strong></p>\n <ul>");
				// 	d = d.concat("<li>" + u + "</li></ul>");
				// 	a.confirm("WRICEF ID cancellation request will be sent to Technical & Functional owners for approval. Continue ?", {
				// 		actions: [a.Action.OK, a.Action.CANCEL],
				// 		emphasizedAction: a.Action.OK,
				// 		details: d,
				// 		onClose: function (t) {
				// 			if (t === "OK") {
				// 				this.busyDialog = new sap.m.BusyDialog({});
				// 				this.busyDialog.open();
				// 				this.valueHelpModel.create("/SUBMIT_REQUESTSet", e, {
				// 					success: function (e) {
				// 						this.busyDialog.close();
				// 						a.success(
				// 							"Request sent to approvers. You will recieve an E-mail with your Request ID & a link to Track your request status.")
				// 					}.bind(this),
				// 					error: function (e) {
				// 						this.busyDialog.close();
				// 						a.error(e.message, {
				// 							details: e.responseText
				// 						})
				// 					}.bind(this)
				// 				})
				// 			}
				// 		}.bind(this)
				// 	})
				// }
				//End of GGUNDU DEV.RPT.002 24/11/2022
			} else {
				var o = this.getView().byId("searchTerm").getValue();
				var n = this.getView().byId("table").getBinding("items");
				n.filter([new sap.ui.model.Filter([new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, o), new sap.ui.model.Filter(
						"CR_NOTES", sap.ui.model.FilterOperator.Contains, o), new sap.ui.model.Filter("CR", sap.ui.model.FilterOperator.Contains, o),
					new sap.ui.model.Filter("RAID", sap.ui.model.FilterOperator.Contains, o), new sap.ui.model.Filter("RICEF", sap.ui.model.FilterOperator
						.Contains, o)
				], false)]);
				this.getView().byId("table").setVisible(true)
			}
		},
		mandatoryError: function (e) {
		
			e.getView().byId("statusText").setText("<strong>Fill All Required Fields</strong>.");
			e.getView().byId("statusText").setType("Error");
			e.getView().byId("statusText").setVisible(true);
			this.submitValidation = true
		},
		clearStatus: function (e) {
			e.getView().byId("statusText").setText("");
			e.getView().byId("statusText").setVisible(false)
		}
	})
});