function ownlocal_insert_business_list(e) {
    $(function () {
        list = $("#ownlocal-business-list ul");
        list.empty();
        $(e).each(function (e, t) {
            var n = $("#ownlocal-business-list-template li").clone();
            n.find(".ownlocal-business-link").attr("href", t.link).text(t.name);
            list.append(n);
            var r = n.find(".ownlocal-business-popup-info");
            r.find("h4 a").attr("href", t.link).text(t.name);
            var i = t.city + ", " + t.state;
            if (t.address) {
                i = t.address + "<br/>" + i
            }
            if (t.website) {
                var s = t.website.replace("http://", "");
                i += " | <a target='_blank' href='http://" + s + "'>" + s + "</a>"
            }
            r.find("p").html(i);
            if (t.ad_image) {
                r.append('<a target="_blank" href="' + t.ad_url + '"><img src="' + t.ad_full_image + '"/></a>')
            } else {
                r.append('<a target="_blank" href="' + t.link + '"><img src="' + t.image + '"/></a>')
            }
        })
    })
}
var ownLocalWidget = {
    params: [],
    loadParams: function () {
        var e = $("#ownLocalJS").attr("src").split("?");
        e = e[1].split("&");
        for (var t = 0; t < e.length; t++) {
            var n = e[t].split("=");
            if (n[1] === "true") {
                n[1] = true
            } else if (n[1] === "false") {
                n[1] = false
            } else if (n[1] == parseFloat(n[1])) {
                n[1] = parseFloat(n[1])
            }
            this.params[n[0]] = n[1]
        }
    },
    createWidget: function () {
        var e = this.params["city"].replace(/\s/g, ""),
            t = e.toLowerCase(),
            n = "http://" + ownLocalWidget.params["domain"].toLowerCase() + "/" + t + "-" + ownLocalWidget.params["state"].toLowerCase(),
            r = '<div id="dfm-ownlocal-widget"> 				  <h3><a href="http://' + ownLocalWidget.params["domain"] + '/" target="_blank">' + this.params["city"] + ' Local Guide</a></h3>				  <div id="ownlocal-business-list" class="widget-section">				    <h4>Featured Businesses</h4>					<ul>					  <li> Loading... </li>					</ul>				  </div>				  <ul id="ownlocal-business-list-template">					<li>					  <a target="_blank" class="ownlocal-business-link"></a>					  <div class="ownlocal-business-popup-info">						<h4><a target="_blank" href="#">Business Name</a></h4>						<p>address<br/>Location, ST | <a href="#">website.com</a></p>					  </div>					</li>				  </ul>				  <div class="widget-section" id="ownlocal-dropdown">				    <div class="dfm-ol-btn-group">						<button type="button" class="dfm-ol-btn dfm-ol-default">Find ' + this.params["city"] + ' AttractionsÂ Â </button>					  <button type="button" class="dfm-ol-btn dfm-ol-primary dfm-ol-dropdown-toggle" data-toggle="dropdown">					    <span class="caret"></span>					  </button>					  <ul class="dropdown-menu">					  <li><a target="_blank" href="' + n + '/nightlife/bars">' + this.params["city"] + ' Bars</a></li>						<li><a target="_blank" href="' + n + '/restaurants/">' + this.params["city"] + ' Restaurants</a></li>					  <li><a target="_blank" href="' + n + '/beauty-and-wellness/beauty-shop">Beauty Salons</a></li>					  <li><a target="_blank" href="' + n + '/arts-and-entertainment">Entertainment in ' + this.params["city"] + '</a></li>					  <li><a target="_blank" href="' + n + '/medical/physicians">Doctors</a></li>					<li><a target="_blank" href="' + n + '/medical/medical-specialists">Medical Specialists</a></li>					  <li><a target="_blank" href="' + n + '/education/">Education in ' + this.params["city"] + '</a></li>					  <li><a target="_blank" href="' + n + '/lawn-and-garden/lawn-care">Lawn Services</a></li>					  <li><a target="_blank" href="' + n + '/legal/attorneys">Lawyers in ' + this.params["city"] + '</a></li>					  <li><a target="_blank" href="' + n + '/shopping">Shopping in ' + this.params["city"] + '</a></li>					  <li><a target="_blank" href="' + n + '/travel">Travel to ' + this.params["city"] + '</a></li>					  <li><a target="_blank" href="' + n + '/beauty-and-wellness/tanning">Tanning in ' + this.params["city"] + '</a></li>					  <li><a target="_blank" href="' + n + '/auto/used-auto-dealer">Used Cars in ' + this.params["city"] + '</a></li>					  <li><a target="_blank" href="' + n + '/wedding-and-party">Wedding Services</a></li>					  </ul>					</div>				  </div>				  <div class="widget-section" id="ownlocal-search-form">				    <h4>Search for a business</h4>					<div class="input-group">					  <form target="_blank" action="http://' + this.params["domain"] + '/search">					    <input type="text" name="query" id="ownlocal-custom-search-field" class="text" value="" title="Search by keyword or Zip"/>					  <span class="dfm-ol-input-group-btn">						  <button class="dfm-ol-btn dfm-ol-primary" type="submit"><span class="glyphicon glyphicon-search"></span></button>					  </span>					  </form>					</div>                  </div>				  <div class="widget-section" id="ownlocal-add-business-link">				    <p>					<a target="_blank" href="http://' + this.params["domain"] + '/#add_business">Add your business here +</a>					</p>				  </div>				</div>				<script src="http://' + this.params["domain"] + '/widget/json/featured_business_list?callback=ownlocal_insert_business_list&include_ads=1&limit=5&level=1"></script>			';
        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: "ownLocalStylesRDS.css"
        }).appendTo("head");
        return r
    },
    init: function () {
        this.loadParams();
        return this.createWidget()
    }
};
$(function () {
    if ($("#ownLocalWidgy").length) {
        var e = $("#ownLocalWidgy")
    } else {
        return false
    }
    e.html(ownLocalWidget.init());
    $("input[type=text][title]").each(function () {
        $(this).val($(this).attr("title"));
        if ($.trim($(this).val()) == "") $(this).val($(this).attr("title"));
        $(this).focus(function () {
            if ($(this).val() == $(this).attr("title")) $(this).val("")
        }).blur(function () {
            if ($.trim($(this).val()) == "") $(this).val($(this).attr("title"))
        })
    })
}); + function (e) {
    "use strict";

    function t() {
        var e = document.createElement("bootstrap");
        var t = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in t) {
            if (e.style[n] !== undefined) {
                return {
                    end: t[n]
                }
            }
        }
    }
    e(function () {
        e.support.transition = t()
    })
}(window.jQuery); + function (e) {
    "use strict";

    function i() {
        e(t).remove();
        e(n).each(function (t) {
            var n = s(e(this));
            if (!n.hasClass("open")) return;
            n.trigger(t = e.Event("hide.bs.dropdown"));
            if (t.isDefaultPrevented()) return;
            n.removeClass("open").trigger("hidden.bs.dropdown")
        })
    }

    function s(t) {
        var n = t.attr("data-target");
        if (!n) {
            n = t.attr("href");
            n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")
        }
        var r = n && e(n);
        return r && r.length ? r : t.parent()
    }
    var t = ".dropdown-backdrop";
    var n = "[data-toggle=dropdown]";
    var r = function (t) {
        var n = e(t).on("click.bs.dropdown", this.toggle)
    };
    r.prototype.toggle = function (t) {
        var n = e(this);
        if (n.is(".disabled, :disabled")) return;
        var r = s(n);
        var o = r.hasClass("open");
        i();
        if (!o) {
            if ("ontouchstart" in document.documentElement) {
                e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click", i)
            }
            r.trigger(t = e.Event("show.bs.dropdown"));
            if (t.isDefaultPrevented()) return;
            r.toggleClass("open").trigger("shown.bs.dropdown")
        }
        n.focus();
        return false
    };
    r.prototype.keydown = function (t) {
        if (!/(38|40|27)/.test(t.keyCode)) return;
        var r = e(this);
        t.preventDefault();
        t.stopPropagation();
        if (r.is(".disabled, :disabled")) return;
        var i = s(r);
        var o = i.hasClass("open");
        if (!o || o && t.keyCode == 27) {
            if (t.which == 27) i.find(n).focus();
            return r.click()
        }
        var u = e("[role=menu] li:not(.divider):visible a", i);
        if (!u.length) return;
        var a = u.index(u.filter(":focus"));
        if (t.keyCode == 38 && a > 0) a--;
        if (t.keyCode == 40 && a < u.length - 1) a++;
        if (!~a) a = 0;
        u.eq(a).focus()
    };
    var o = e.fn.dropdown;
    e.fn.dropdown = function (t) {
        return this.each(function () {
            var n = e(this);
            var i = n.data("dropdown");
            if (!i) n.data("dropdown", i = new r(this));
            if (typeof t == "string") i[t].call(n)
        })
    };
    e.fn.dropdown.Constructor = r;
    e.fn.dropdown.noConflict = function () {
        e.fn.dropdown = o;
        return this
    };
    e(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n + ", [role=menu]", r.prototype.keydown)
}(window.jQuery)
