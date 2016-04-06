import $ from 'jquery';
import { PATH } from './action';

const ajaxSetup = () => $.ajaxSetup({async:false});

export function categories(){
	ajaxSetup();
	let result;
	$.get(PATH.CATEGORIES, (data) => result = data);
	return result;
}

export function getAll(){
	ajaxSetup();
	let result;
	$.get(PATH.PRODUCTS, (data) => result = data);
	return result;
}

export function filtered(id){	
	if(id == 0) return getAll();
	ajaxSetup();
	let result;
	$.ajax({
		type: 'GET',
		url: '/api/products/?category=' + id,
		success: function(data){
			result = data;
		},
		error: function(){
			result = {};
		}
	});
	return result;
}

export function deleted(id){
	let result;
	$.ajax({
		type: 'DELETE',
		url: '/api/products/' + id + '/',
		async: false,
		success: function(){
			result = true;
		},
		error: function(){
			result = false;
		}
	});
	return result;
}

export function deletedCategories(id){
	let result;
	$.ajax({
		type: 'DELETE',
		url: '/api/categories/' + id + '/',
		async: false,
		success: function(){
			result = true;
		},
		error: function(){
			result = false;
		}
	});
	return result;
}

export function addCategories(name){
	let result;
	$.ajax({
		type: 'POST',
		url: '/api/categories/',
		data: {name: name},
		success: function(data){
			result = true;
		},
		error: function(error){
			result = false;
		}
	});
	return result;
}
