#!/usr/bin/env ruby
require 'yaml'
require 'erb'
require 'set'

projects = YAML.load_file("projects.yml").values.sort_by { |p| p['name'] }

@categories = Hash.new { |h, k| h[k] = [] }

projects.each do |project|
  @categories[project['category']] << project
end

template = ERB.new(File.read("src/index.html.erb"))

File.open("index.html", "w") do |f|
  f.write(template.result)
end
