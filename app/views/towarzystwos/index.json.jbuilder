json.array!(@towarzystwos) do |towarzystwo|
#  json.extract! towarzystwo, :id, :nazwa
json.label towarzystwo.nazwa
json.value towarzystwo.id
end
