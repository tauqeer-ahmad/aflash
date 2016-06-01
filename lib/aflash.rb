require "aflash/version"

module Aflash
  class Engine < ::Rails::Engine; end
  extend ActiveSupport::Concern

  included do
    after_filter :add_flash_to_header
  end

  private
  def add_flash_to_header
    return unless request.xhr?
    response.headers['X-Flash'] = flash.to_h.to_json
    flash.discard
  end
end
