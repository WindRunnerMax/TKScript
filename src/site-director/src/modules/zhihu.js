
const website = {
    regexp: /zhihu/,
    init: function($) {
        $(document).on("click", (e) => {
           let cur = e.target;
           const regexp = /.*link.zhihu.com\/\?target=(.*)/;
           for(let i=0; i<5; ++i){
               if(!cur) break;
               if(cur.nodeName === "A"){
                   if(regexp.test(cur.href)){
                       const url = decodeURIComponent(/.*link.zhihu.com\/\?target=(.*)/.exec(cur.href)[1]);
                       console.log(url);
                       window.open(url);
                       return false;
                    }
                    break;
                }
               cur = cur.parentNode;
            }
        });
    }
}

export default website;

