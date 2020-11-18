/*
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2020 IJSE
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 */

/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/15/20
 **/

/*===============================================================================
 * Global Variables
 *===============================================================================*/
var txtId;
var txtName;
var txtAddress;
var selectedCustomer = null;

/*===============================================================================
 * Init
 *===============================================================================*/

init();

function init(){
    $("#txt-id").focus();
    txtId = $("#txt-id");
    txtName = $("#txt-name");
    txtAddress = $("#txt-address");
}

/*===============================================================================
 * Event Handlers and Timers
 *===============================================================================*/

$("#btn-save").click(handleSave);
txtId.on('input',handleInput);
txtName.on('input',handleInput);
txtAddress.on('input',handleInput);

/*===============================================================================
 * Functions
 *===============================================================================*/


function handleSave(){
    if (!validate()) {
        return;
    }

    if (!selectedCustomer){
        $("table tbody").append('<tr>' +
            '<td>'+ txtId.val() + '</td>' +
            '<td>'+ txtName.val() + '</td>'+
            '<td>'+ txtAddress.val() +'</td>' +
            '<td><div id="btn-Delete"></div></td>' +
            '</tr>');

        showOrHideTFoot()
        $("tbody #btn-Delete").click(function (){
            Swal.fire({
                title: 'Are you sure whether you want to delete this customer?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $(this).parents('tr').remove();
                    showOrHideTFoot();
                    clearSelection();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        });
        $("tbody tr").click(function (){
            clearSelection();
            selectedCustomer = this;
            $(this).addClass('selected');
            txtId.val($(this).children().eq(0).text());
            txtName.val($(this).children().eq(1).text());
            txtAddress.val($(this).children().eq(2).text());
            txtId.prop("disabled",true);
        })
    }else {
        $(selectedCustomer).children().eq(1).text(txtName.val());
        $(selectedCustomer).children().eq(2).text(txtAddress.val());
        clearSelection();

    }
    txtId.val('');
    txtName.val('');
    txtAddress.val('');
    txtId.focus();
}

function clearSelection(){
    txtId.prop("disabled",false);
    $("table tbody tr").removeClass('selected');
    selectedCustomer = null;
}

function showOrHideTFoot(){
    $("table tbody tr").length > 0 ? $("table tfoot").addClass("hide"): $("table tfoot").removeClass("hide");
}

function handleInput(){
    $(this).removeClass('is-invalid');
}

function validate(){

    var regExp = null;
    var validated = true;

    txtId.removeClass("is-invalid");
    txtName.removeClass("is-invalid");
    txtAddress.removeClass("is-invalid");

    if (txtAddress.val().trim().length < 3) {
        txtAddress.addClass('is-invalid');
        txtAddress.select();
        validated = false;
    }

    regExp = /^[A-Za-z][A-Za-z .]{3,}$/;
    if (!regExp.test(txtName.val())) {
        txtName.addClass('is-invalid');
        txtName.select();
        validated = false;
    }

    regExp = /^C\d{3}$/;
    if (!regExp.test(txtId.val())) {
        txtId.addClass('is-invalid');
        $("#helper-txt-id").removeClass('text-muted');
        $("#helper-txt-id").addClass('invalid-feedback');
        txtId.select();
        validated = false;
    }

    return validated;
}
