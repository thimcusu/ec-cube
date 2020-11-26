/*
 * This file is part of EC-CUBE
 *
 * Copyright(c) EC-CUBE CO.,LTD. All Rights Reserved.
 *
 * http://www.ec-cube.co.jp/
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

window.addEventListener('DOMContentLoaded', function(){
    $(".pagetop").hide();

    $(window).on("scroll", function() {
        // ページトップフェードイン
        if ($(this).scrollTop() > 300) {
            $(".pagetop").fadeIn();
        } else {
            $(".pagetop").fadeOut();
        }

        // PC表示の時のみに適用
        if (window.innerWidth > 767) {
            if ($(".ec-orderRole").length) {
                var side = $(".ec-orderRole__summary"),
                    wrap = $(".ec-orderRole").first(),
                    min_move = wrap.offset().top,
                    max_move = wrap.height(),
                    margin_bottom = max_move - min_move;

                var scrollTop = $(window).scrollTop();
                if (scrollTop > min_move && scrollTop < max_move) {
                    var margin_top = scrollTop - min_move;
                    side.css({ "margin-top": margin_top });
                } else if (scrollTop < min_move) {
                    side.css({ "margin-top": 0 });
                } else if (scrollTop > max_move) {
                    side.css({ "margin-top": margin_bottom });
                }
            }
        }
        return false;
    });

    $(".ec-headerNavSP").on("click", function() {
        $(".ec-layoutRole").toggleClass("is_active");
        $(".ec-drawerRole").toggleClass("is_active");
        $(".ec-drawerRoleClose").toggleClass("is_active");
        $("body").toggleClass("have_curtain");
    });

    $(".ec-overlayRole").on("click", function() {
        $("body").removeClass("have_curtain");
        $(".ec-layoutRole").removeClass("is_active");
        $(".ec-drawerRole").removeClass("is_active");
        $(".ec-drawerRoleClose").removeClass("is_active");
    });

    $(".ec-drawerRoleClose").on("click", function() {
        $("body").removeClass("have_curtain");
        $(".ec-layoutRole").removeClass("is_active");
        $(".ec-drawerRole").removeClass("is_active");
        $(".ec-drawerRoleClose").removeClass("is_active");
    });

    $(".ec-orderMail__link").on("click", function() {
        $(this)
            .siblings(".ec-orderMail__body")
            .slideToggle();
    });

    $(".ec-orderMail__close").on("click", function() {
        $(this)
            .parent()
            .slideToggle();
    });

    $(".is_inDrawer").each(function() {
        var html = $(this).html();
        $(html).appendTo(".ec-drawerRole");
    });

    $(".ec-blockTopBtn").on("click", function() {
        $("html,body").animate({ scrollTop: 0 }, 500);
    });

    // スマホのドロワーメニュー内の下層カテゴリ表示
    // TODO FIXME スマホのカテゴリ表示方法
    $(".ec-itemNav ul a").click(function() {
        var child = $(this).siblings();
        if (child.length > 0) {
            if (child.is(":visible")) {
                return true;
            } else {
                child.slideToggle();
                return false;
            }
        }
    });

    // Handle overlay background when trigger action in load-overlay class
    const loadOverlay = document.querySelector('.load-overlay');
    loadOverlay && loadOverlay.addEventListener('click', loadingOverlay);
    loadOverlay && loadOverlay.addEventListener('change', loadingOverlay);
  
    document.querySelectorAll('.js-submit[type="submit"]').forEach(function(element){
      element.addEventListener('click', function(){
        var valid = true;
        var form = getAncestorOfTagType(element, 'FORM');
        form && !form.hasAttribute('novalidate') && (valid = form.checkValidity());
        if (valid) {
            loadingOverlay();
        }
      });
    });
    // Toggle header Cart
    document.querySelector(".js-collapsible").addEventListener('click',function() {
      this &&
        this.querySelector(".js-expand").classList.toggle("u-active");
    });

    const createForm = function(action, data) {
      let form = document.createElement('form');
      form.setAttribute('action', action);
      form.setAttribute('method', 'post');
      for (const input in data) {
        form.innerHTML += '<input name="' + input + '" value="' + data[input] + '">'
      }
      return form;
  };

  document.querySelectorAll('a[token-for-anchor]').forEach(function(element){
    element.addEventListener('click', function(e) {
      e.preventDefault();
      const {method, message, confirm} = element.dataset;
      /*
       *Confirm deleting cart?
       * - If no, return
       * - If yes, continue
       */
      if (!confirm || confirm!='false') {
          const isDelete = window.confirm(message?message:eccube_lang["common.delete_confirm"]);
          if(!isDelete) return;
      }
      // Make a overlay background when trigger action
      loadingOverlay();
      const form = createForm(element.href, {
          _token: element.getAttribute("token-for-anchor"),
          _method: method
      });
      form.style.display = 'none';
      document.body.appendChild(form); // Firefox requires form to be on the page to allow submission
      form.submit();
  });
});
});

// Create a overlay to cover page  
function loadingOverlay(action) {
  if (action == "hide") {
    const overLayNode =  document.querySelector('.bg-load-overlay');
    overLayNode && overLayNode.parentNode.removeChild(overLayNode);
  } else {
      let overLayNode = document.createElement("div"); 
      overLayNode.classList.add('bg-load-overlay');
      document.body.appendChild(overLayNode);
  }
}

$(window).on("pageshow", function() {
    loadingOverlay("hide");
});

/**
 *  要素FORMチェック
 */
function getAncestorOfTagType(elem, type) {
    while (elem.parentNode && elem.tagName !== type) {
        elem = elem.parentNode;
    }

    return type === elem.tagName ? elem : undefined;
}

// anchorをクリックした時にformを裏で作って指定のメソッドでリクエストを飛ばす
// Twigには以下のように埋め込む
// <a href="PATH" {{ csrf_token_for_anchor() }} data-method="(put/delete/postのうちいずれか)" data-confirm="xxxx" data-message="xxxx">
//
// オプション要素
// data-confirm : falseを定義すると確認ダイアログを出さない。デフォルトはダイアログを出す
// data-message : 確認ダイアログを出す際のメッセージをデフォルトから変更する
//

