$(function () {
	'use strict'

	var div, spanElements, currentIndex, dtList, btnList, buttonsYes, buttonsNo, buttonsExtinct, first, second, third,
		extinct, countExtinct, isExtinct, contents, ranges, sum, meter, result, image, dialog, i;
	var value;
	//var elemsSlide = [elemsDog, elemsJackal, elemsWolf, elemsVixen];

	var currentIndex = sum = 0,
	countExtinct = 1,
	itemCount = 5,
	btnList = $('#XButton, #Next, #Prev'),
	dtList = $('#Dog, #Jackal, #Wolf, #Vixen'),
	buttonsYes = $('#IsDogChecked, #IsJackalChecked, #IsWolfChecked, #IsVixenChecked'),
	buttonsNo = $('#IsDogCheckedNo, #IsJackalCheckedNo, #IsWolfCheckedNo, #IsVixenCheckedNo'),
	buttonsExtinct = $('#IsDogExtinct, #IsJackalExtinct, #IsWolfExtinct, #IsVixenExtinct'),
	rangeList = $('td .range'),
	first = $('#First'),
	second = $('#Second'),
	third = $('#Third'),
	image = $('#Slide'),
	extinct = $('#Extinct'),
	contents = $('#Contents'),
	counters = $('counter'),
	meter = $('#Meter'),
	output = $('output'),
	dialog = $('dialog'),
	k, q,
	firstBox = $('.first'),
	secondBox = $('.second'),
	thirdBox = $('.third'),
	checkBoxes = $('td .extinct_box'),
	ddContent = $('dl dd');

	/*---------------------------------------------------------------------------------*/

	for (let i = 0; i < ddContent.length; i++) {
		ddContent[i].on('click', function () {
			if (!checkBoxes[i].prop('checked')) {
				this.text(prompt('Enter text: ', this.text()));
			}
		});
	}

	function setValue(className) {
		var allRadios = $('.' + className);
		for (var i in allRadios) {
			if (allRadios[i] instanceof HTMLElement) {
				allRadios[i].click();
			}
		}
	}

	first.on('click', function () { setValue('first'); })
	second.on('click', function () { setValue('second'); })
	third.on('click', function () { setValue('third'); })

	extinct.onclick = function () {
		var value = countExtinct % 2;
		for (var i = 0; i < buttonsExtinct.length; i++) {
			buttonsExtinct[i].checked = value;
		}
		countExtinct++;
	}
	var calculate = function (e) {
		meter.value = ((e.offsetX) / 120) * 500;
		output.innerText = parseInt(meter.value * sum);
	}
	meter.onmousedown = function (e) {
		meter.on('mousedown', calculate);
		meter.on('mousemove', calculate);
		document.on('mouseup', function () {
			meter.off('mousemove', calculate);
		});
	}
	var resultValues = function (q) {
		return function () {
			addValue();
			document.on('mouseup', function () {
				rangeList[q].off('mousemove', addValue);
			});
			rangeList[q].on('mouseout', function () {
				rangeList[q].off('mousemove', addValue);
			})
		}
	}
	for (let i = 0; i < rangeList.length; i++) {
		rangeList[i].onmousemove = resultValues(i);
	}

	function addValue(e) {
		sum = 0;
		for (let i = 0; i < rangeList.length; i++) {
			sum += parseInt(rangeList[i].value);
		}
		output.innerText = parseInt(meter.value * sum);
	}
	function logRange(range) {
		log(range.title = range.value);
	}

	//left = $('counter')[i].find('[type=button]')[i];
	//text = $('counter')[1].find('[type=text]')[i];

	//for (let i = 0; i < 4; i++) {
	//	left[i].onclick = function () {
	//		text[i].value = (+text[i].value - 1) % 5;
	//	}
	//}

	function down(obj) {
			var text = obj.find('[type=text]');
			text.value = (text.value - 1) % 5;
		}
	function up(obj) {
			var text = obj.find('[type=text]');
			text.value = (+text.value + 1) % 5;
		}

	

	for (let i = 0; i < counters.length; i++) {
		counters[i].on('click', function () { down(counters[i]) }, '.left_button');
		counters[i].on('click', function () { up(counters[i]) }, '.right_button');
	}
})