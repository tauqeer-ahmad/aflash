(function(){
var notifiers, showErrorsInResponse, showFlashMessages;

notifiers = {
  notice: 'success',
  alert: 'error',
  info: 'info'
};

showFlashMessages = function(jqXHR) {
  var flash;
  if (!jqXHR || !jqXHR.getResponseHeader) return;
  flash = jqXHR.getResponseHeader('X-Flash');
  flash = JSON.parse(flash);
  return _.each(flash, function(message, key) {
    return toastr[notifiers[key]](message);
  });
};

showErrorsInResponse = function(jqXHR) {
  var error, response;
  (jqXHR.responseJSON)
  if (!jqXHR || !jqXHR.responseJSON || !jqXHR.responseJSON.errors) return;
  response = jqXHR.responseJSON;
  error = _.map(response.errors, function(messages, property) {
    return _.map(messages, function(x) {
      return "" + property + " " + x;
    }).join("<br />");
  });
  return toastr.error(error, "ERROR");
};

$(function() {
  toastr.options.positionClass = 'toast-top-right';
  return $(document).ajaxComplete(function(event, xhr, settings) {
    showFlashMessages(xhr);
    showErrorsInResponse(xhr);
  });
});
})(this)
