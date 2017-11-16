$(function () {
    // getSearchListData();



    var  flag = true ;
    var  judge = true;

    mui.init({
        // 注意: 按照文档上书写的DOM结构无特殊要求，只需要指定一个下拉刷新容器标识即可
        // 但是实际上不行,按照实践要求 必须在区域滚动的基础上才可以
        pullRefresh: {
            container: "#lt-search",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可 选，默认“#2BD009” 下拉刷新控件颜色
                height: '50px',//可选,默认50px.下拉刷新控件的高度,
                range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    // console.log(1);
                    getSearchListData();

                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 排序
    // 价格

    $('.order-price').on('singleTap',function() {
        $('.search-result-order a').removeClass('active');
        $(this).addClass('active');
        if(flag == true) {
            // 价格 1升序 2 降序
            // 库存情况  1 升序 2 降序
             // getSearchListData(页码,价格,库存);
             getSearchListData(1,1,null)
            flag = false;
            $(this).find('i').removeClass('fa-angle-down');
            $(this).find('i').addClass('fa-angle-up');
           
        }else {
            getSearchListData(1,2,null);
            flag = true ;
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
        }

    })

    // 销量

// 默认效果是降序的
    $('.order-stock').on('singleTap',function() {
        $('.search-result-order a').removeClass('active');
        $(this).addClass('active');

        if(judge == true) {
            getSearchListData(1,null,1);
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');
            judge = false;
        }else {
            getSearchListData(1,null,2);
            $(this).find('i').removeClass('fa-angle-up');
            $(this).find('i').addClass('fa-angle-down');
            judge = true;
        }
    })
})



// 点击进入商品页面

$('.search-result-list').on('tap','button',function() {
    var id = $(this).attr('data-id');
    location.href = './detail.html?id='+ id ;
})

// 获取搜索结果

var getSearchListData = function (pageNum,price,num) {

    // console.log(location);

    // href
    //origin
    //search

    // console.log(location.href);

    var url = new URLSearchParams(location.search);
    // console.log(url);
    // location.search
    //获取指定参数的第一个值
    var  proName = url.get('proName');
    // console.log(proName);


    


    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            proName: proName || '',
            page: pageNum || 1,
            pageSize: 6,
            price: price || null ,
            num : num || 2 
        },
        success: function (data) {
            console.log(data);
            var searchList = template('searchListTemplate',data);
            $('.search-result-list').html(searchList);
        }
    })







}