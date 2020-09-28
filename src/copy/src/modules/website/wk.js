function init($) {
    $(window).on("load", (e) => {
          $(".sf-edu-wenku-vw-container").attr("style", "");
          $(".sfa-body").on("selectstart", function (e) {
              e.stopPropagation();
              return true;
        })
    });
}

export default { init }