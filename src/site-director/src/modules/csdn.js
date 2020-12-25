
const website = {
    regexp: /csdn/,
    init: function($) {
        $("#article_content  a:not([name])").each((i, v) => {
            let a = document.createElement("a");
            a.innerHTML = `<span onclick="window.open('${v.href}')">${v.innerText}</>`;
            v.replaceWith(a);
        });
    }
}

export default website;