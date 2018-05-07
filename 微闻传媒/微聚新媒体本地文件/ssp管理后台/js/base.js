	
	function getUrl(){
		return 'http://'+window.location.host;
	}
	/* DATA TABLES */
		
		function init_DataTables() {
			
			console.log('run_datatables');
			
			if( typeof ($.fn.DataTable) === 'undefined'){ return; }
			console.log('init_DataTables');
			
			var handleDataTableButtons = function() {
			  if ($("#datatable-buttons").length) {
				$("#datatable-buttons").DataTable({
				  dom: "Bfrtip",
				  buttons: [
					{
					  extend: "copy",
					  className: "btn-sm"
					},
					{
					  extend: "csv",
					  className: "btn-sm"
					},
					{
					  extend: "excel",
					  className: "btn-sm"
					},
					{
					  extend: "pdfHtml5",
					  className: "btn-sm"
					},
					{
					  extend: "print",
					  className: "btn-sm"
					},
				  ],
				  responsive: true
				});
			  }
			};

			TableManageButtons = function() {
			  "use strict";
			  return {
				init: function() {
				  handleDataTableButtons();
				}
			  };
			}();

			$('#datatable').dataTable();

			$('#datatable-keytable').DataTable({
			  keys: true
			});

			$('#datatable-responsive').DataTable();

			$('#datatable-scroller').DataTable({
			  ajax: "js/datatables/json/scroller-demo.json",
			  deferRender: true,
			  scrollY: 380,
			  scrollCollapse: true,
			  scroller: true
			});

			$('#datatable-fixed-header').DataTable({
			  fixedHeader: true
			});

			var $datatable = $('#datatable-checkbox');

			$datatable.dataTable({
			  'order': [[ 1, 'asc' ]],
			  'columnDefs': [
				{ orderable: false, targets: [0] }
			  ]
			});
			$datatable.on('draw.dt', function() {
			  $('checkbox input').iCheck({
				checkboxClass: 'icheckbox_flat-green'
			  });
			});

			TableManageButtons.init();
			
		};

	// Switchery
	$(document).ready(function() {
	    if ($(".js-switch")[0]) {
	        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
	        elems.forEach(function (html) {
	            var switchery = new Switchery(html, {
	                color: '#26B99A'
	            });
	        });
	    }
	});
	// /Switchery

	// iCheck
	$(document).ready(function() {
	    if ($("input.flat")[0]) {
	        $(document).ready(function () {
	            $('input.flat').iCheck({
	                checkboxClass: 'icheckbox_flat-green',
	                radioClass: 'iradio_flat-green'
	            });
	        });
	    }
	});
	// iCheck
	// Table
	$('table input').on('ifChecked', function () {
	    checkState = '';
	    $(this).parent().parent().parent().addClass('selected');
	    countChecked();
	});
	$('table input').on('ifUnchecked', function () {
	    checkState = '';
	    $(this).parent().parent().parent().removeClass('selected');
	    countChecked();
	});

	var checkState = '';

	$('.bulk_action input[name="table_records"]').on('ifChecked', function () {
	    checkState = '';
	    $(this).parents("tr").addClass('selected');
	    countChecked();
	});
	$('.bulk_action input[name="table_records"]').on('ifUnchecked', function () {
	    checkState = '';
	    $(this).parents("tr").removeClass('selected');
	    countChecked();
	});


	$('.bulk_action input#check-all').on('ifChecked', function () {
	    checkState = 'all';
	    countChecked();
	});
	$('.bulk_action input#check-all').on('ifUnchecked', function () {
	    checkState = 'none';
	    countChecked();
	});

	function countChecked() {
	    if (checkState === 'all') {
	        $(".bulk_action input[name='table_records']").iCheck('check');
	    }
	    if (checkState === 'none') {
	        $(".bulk_action input[name='table_records']").iCheck('uncheck');
	    }

	    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

	    if (checkCount) {
	    	
	        // $('.column-title').hide();
	        $('.bulk-actions').show();
	        $('.action-cnt').html(checkCount + ' Records Selected');
	    } else {
	        // $('.column-title').show();
	        $('.bulk-actions').hide();
	    }
	}

	   /* DATERANGEPICKER */
	   
		function init_daterangepicker() {

			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');
		
			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange span').html(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
			};

			var optionSet1 = {
			  startDate: moment(),
			  endDate: moment(),
			  minDate: '01/01/2000',
			  maxDate: '12/31/2099',
			  dateLimit: {
				days: 60
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  showCustomRangeLabel:true,
			  timePicker: false,
			  timePickerIncrement: 1,
			  timePicker12Hour: true,
			  ranges: {
				'今日': [moment(), moment()],
				'昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'最近7日': [moment().subtract(6, 'days'), moment()],
				'最近30日': [moment().subtract(29, 'days'), moment()],
				'本月': [moment().startOf('month'), moment().endOf('month')],
				'上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'MM/DD/YYYY',
			  separator: ' to ',
			  locale: {
				applyLabel: '确认',
				cancelLabel: '取消',
				fromLabel: 'From',
				toLabel: 'To',
				customRangeLabel: '自定义',
				daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
				monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
				firstDay: 1
			  }
			};
			
			$('#reportrange span').html(moment().format('MM/DD/YYYY') + ' - ' + moment().format('MM/DD/YYYY'));
			$('#reportrange').daterangepicker(optionSet1, cb);
			$('#reportrange').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('MM/DD/YYYY') + " to " + picker.endDate.format('MM/DD/YYYY'));
			});
			$('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			$('#options1').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			});
			$('#options2').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			});
			$('#destroy').click(function() {
			  $('#reportrange').data('daterangepicker').remove();
			});
	  
		}


	

	//pop弹窗

	function popfn(obj,item){
		$(obj).click(function(){
			// alert(111)
			if($(item).attr('display')=='block'){
				return;
			}else{
				$(item).fadeIn(300);
				// setTimeout($(item).fadeOut(300),3000)
			}
		})
	};

	$(".pop .btn").click(function(){
		$(this).parents(".pop").fadeOut(300)
	});
