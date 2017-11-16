$(function() {

    getDetailData();

    // mui('.mui-scroll-wrapper').scroll({
    //     scrollY: true, //是否竖向滚动
    //     scrollX: false, //是否横向滚动
    //     startX: 0, //初始化时滚动至x
    //     startY: 0, //初始化时滚动至y
    //     indicators: false, //是否显示滚动条
    //     deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    //     bounce: true //是否启用回弹
    // });

    mui.init({
        // 注意: 按照文档上书写的DOM结构无特殊要求，只需要指定一个下拉刷新容器标识即可
        // 但是实际上不行,按照实践要求 必须在区域滚动的基础上才可以
        pullRefresh: {
            container: ".lt-detail",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                height: '50px',//可选,默认50px.下拉刷新控件的高度,
                range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    // console.log(1);
                    getDetailData();

                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    $('body').on('singleTap','.add-cart',function() {

        if(window.addCarting == 1) return false;
        var  data = {
            //获取当前商品的Id
            id: window.id,
            //获取当前的尺寸
            size: $('.detail-size span.orangeColor').html(),
            //获取当前当前的值
            num:parseInt($('.detail-num input').val())
        };
        if(!data.id) {
            mui.toast('商品异常');
            return false;
        }
        if (!data.size) {
            mui.alert('请选择尺码');
            return  false;
        }
        if (!data.num) {
            mui.alert('请选择数量');
            return false;
        }

        addCart(data,function () {
            window.addCarting = 0;
            mui.confirm('添加成功,去购物车看看','温馨提示', ['是','否'] ,function(e) {
                if(e.index == 0 ) {
                    location.href = './cart.html'
                }
            });
            

    })
})

    // 进行事件的委托

    $('body').on('singleTap', '.detail-num span', function () {
        var $this = $(this);
        var $input = $('.detail-num  input');
        var num = parseInt($input.val());
        var max = $input.data('max');

        if ($this.hasClass('jian')) {
            num > 0 && $input.val(num - 1);
        } if ($this.hasClass('jia')) {
            if (num < max) {
                $input.val(num + 1);
            }else  {
                mui.toast('没有库存了');
            }
        }
    }) 


    $('body').on('singleTap', '.detail-size span', function () {
        var $this = $(this);
        var $span = $('.detail-num  span');
        $('body .detail-size span').removeClass('orangeColor');
        $this.addClass('orangeColor');
    }) 

})





var getDetailData = function () {

    var url = new URLSearchParams(location.search);

    window.id = url.get('id');

    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {

            // console.log(data);

            var detail = template('detailTemplate', data);

            $('.mui-scroll').html(detail);

            var size = data.size;

            var first = size.slice(0, 2);

            var second = size.slice(3);

            var obj = {
                arr: [first, second]
            }

            var sizeList = template('sizeTemplate', obj);

            $('.detail-size').append(sizeList);
        }
    })
}


var  addCart  = function (data,callback) {
    $.ajax({
        type:'post',
        url:'/cart/addCart',
        dataType:'json',
        data:data,
        beforeSend:function () {
            window.addCarting = true;
        },
        success:function (data) {
            callback && callback(data);
        },
        error:function() {
            mui.toast('服务器繁忙');
        }
    })

}