function $log(str) {
	console.log(str);
}
function $dir(str) {
	console.dir(str);
}
function $(selector, attributes) {
	if ('function' === typeof selector) {
		document.on('DOMContentLoaded', selector);
		return;
	}
	if (typeof selector !== 'string') {
		return selector;
	}
	var isTag = /<\w+>/.test(selector);
	if (isTag) {
		var matches = /\w+/.exec(selector);
		if (Array.isArray(matches)) {
			return document
					.createElement(matches[0])
					.attr(attributes);
		}
	} else {
		tags = document.querySelectorAll(selector);
		for (var i = 0 ; i < tags.length; i++) {
			for (var prop in attributes) {
				tags[i].attr(prop, attributes[prop]);
			}
		}
		return tags.length == 1 ? tags[0] : tags;
	}
}
HTMLElement.prototype.attr = function (attrName, attrValue) {
	switch (arguments.length) {
		case 1: {
			if (typeof attrName == 'string') {
				return this.getAttribute(attrName);
			}
			var attributes = arguments[0];
			for (var prop in attributes) {
				if ('function' == typeof this[prop]) {
					if (Array.isArray(attributes[prop])) {
						for (var i = 0; i < attributes[prop].length; i++) {
							this[prop](attributes[prop][i]);
						}
					}
					else {
						this[prop](attributes[prop]);
					}
				}
				this.attr(prop, attributes[prop]);
			}
			break;
		}
		case 2: {
			this.setAttribute(attrName, attrValue);
			break;
		}
	}
	return this;
}
HTMLElement.prototype.remove = function (attrName, attrValue) {
	switch (arguments.length) {
		case 1: {
			if (typeof attrName == 'string') {
				return this.removeAttribute(attrName);
			}
			var params = arguments[0];
			for (var param in params) {
				this.removeAttribute(param, params[param]);
			}
			break;
		}
		case 2: {
			this.removeAttribute(attrName, attrValue);
			break;
		}
	}
	return this;
}
HTMLElement.prototype.css = function (attrName, attrValue) {
	switch (arguments.length) {
		case 1: {
			if ('string' == typeof attrName) {
				return this.style[attrName];
			}
			var params = arguments[0];
			for (var param in params) {
				this.style[param] = params[param];
			}
			break;
		}
		case 2: {
			this.style[attrName] = attrValue;
			break;
		}
	}
	return this;
}
HTMLElement.prototype.append = function () {
	for (var i = 0; i < arguments.length; i++) {
		this.appendChild(arguments[i]);
	}
	return this;
}
EventTarget.prototype.on = function (events, handler, selector) {
	//if (Object == events.constructor) {
	//	for (var event in events) {
	//		if (events.hasOwnProperty(event)) {
	//			this.addEventListener(event, events[event]);
	//		}
	//	}
	//}
	this.addEventListener(events,
		selector ?
		(function () {
			if (event.target == this.find(selector)) {
				handler();
			}
		}) : handler,
	false);
	return this;
}
EventTarget.prototype.off = function (events, handler) {
	this.removeEventListener(events, handler, false);
	return this;
}
EventTarget.prototype.$click = function (handler) {
	return this.on('click', handler);
}
HTMLElement.prototype.val = function (value) {
	return value ? (this.value = value, this) : this.value;
}
HTMLElement.prototype.text = function (value) {
	return value ? (this.textContent = value, this) : this.textContent;
}
HTMLElement.prototype.prop = function (propName, propValue) {
	return (null == propName ? this
		: null == propValue ? this[propName]
		: (this[propName] = propValue, this));
}
HTMLElement.prototype.removeProp = function (propName) {
	return null == propName ? this : (this[propName] = undefined, (delete this[propName], this));
}
HTMLElement.prototype.content = function (value) {
	return value ? (this.textContent = value, this) : this.textContent;
}
HTMLElement.prototype.html = function (value) {
	return value ? (this.innerHTML = value, this) : this.innerHTML;
}
HTMLElement.prototype.find = function (selector) {
	var elements = this.querySelectorAll(selector);
	return (elements.length == 1 ? elements[0] : elements);
}
HTMLElement.prototype['+'] = function (value) {
	this.val(this.val() + value);
	return this;
}
HTMLElement.prototype.empty = function () {
	this.val('');
	this.text('');
	return this;
}
/*****************************
Object.prototype[DELIMITERS.FULL_POINT + 'changeHandler'] =
	function changeHandler(events, handler, $delegate) {
		var that = this;
		var pattern = /\s/;

		events
			.replace(pattern, '')
			.split(DELIMITERS.COMMA)
			.forEach($delegate, that);

		return that;
	}
Object.prototype.removeProp = function (propNames) {
	return this
			[DELIMITERS.FULL_POINT + 'changeHandler']
			(this, DELIMITERS.EMPTY, function (propNames) { delete this[propNames]; });
}
EventTarget.prototype.on = function (events, handler) {
	return (this
		[DELIMITERS.FULL_POINT + 'changeHandler']
		(events, handler, function (item) { this.addEventListener(item, handler); }),
		this);
}
const DELIMITERS = {
	EMPTY: '',
	SPACE: ' ',
	COMMA: ',',
	FULL_POINT: '.',
}
*********************************************************/