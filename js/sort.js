$(function(){


    //当进入当前页面发起ajax请求.从后台拿数据

    var  getFirstData = function(){
        $.ajax({
            url:'/category/queryTopCategory',
            type:'get',
            data:{},
            dataType:'json',
            success:function(data){
                console.log(data);
                // 模板引擎渲染页面 参数1  就是模板的id   参数2从后台返回的响应体 以对象的形式展现

               var  firstResult = template('firstTemplate',data);

               //模板引擎获取的数据必须添加到相应 的 父元素中
                $('.lt-sort-left ul').html(firstResult);
                // var myscroll = new iScroll("wrapper");
                // 当前渲染的页面必须要展示第一张分类的  二级分类展示

                getSecondData(data.rows[0].id);
            }
        })
    }
    getFirstData();
  

    // 发起二次请求
    var  getSecondData = function(id) {
        $.ajax({
            type : 'get',
            url:' /category/querySecondCategory',
            data:{
                id:id
            },
            success:function(data) {
                // console.log(1);
                // console.log(data);
                var  secondReuslt = template('secondTemplate',data);
                $('.lt-sort-right ul').html(secondReuslt);

            }
        })
    }
    //对于一个元素中的子元素 最好的方式就是进行事件委托
    $('.lt-sort-left').on('tap','a',function(){

        $('.lt-sort-left ul').find('a').removeClass('active');
        $(this).addClass('active');

        // 使用 data属性进行数据的获取 搭配模板引擎获取后台返回的相关数据,然后通过js进行属性的获取
        // jquery中两种的获取方式:
        // $(this).data('id');
        // $(this).attr('data-id');
        // 原生js
        // DOM.getAttribute('data-id');
        
        var id = $(this).data('id');
        // console.log(id);

        getSecondData(id);


    })

})
