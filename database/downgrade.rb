require_relative './list_files.rb'
require 'mysql'
list_files = Files.list_files
file_directory = './database/delete/';
table_config = 'table_config'
begin
    puts "Downgrading the database"
    dbh = Mysql.real_connect(ENV['SQLHOST'], ENV['SQLLOGIN'], ENV['SQLPASSWORD'], ENV['SQLDATABASE'])
    length = 0
    list_update = dbh.query("SELECT * FROM #{table_config}")
    list_update.each_hash do |row|
        length += 1
    end
    puts list_files[length - 1]
    dbh.query("DELETE FROM #{table_config} WHERE file_name = '#{list_files[length - 1]}'")
    update = `mysql -u#{ENV['SQLLOGIN']} -p#{ENV['SQLPASSWORD']} -h #{ENV['SQLHOST']} < #{file_directory + list_files[length - 1]}`;

rescue Mysql::Error => e
    puts "Code d'erreur : #{e.errno}"
    puts "Message d'erreur : #{e.error}"
    puts "SQLSTATE d'erreur : #{e.sqlstate}" if e.respond_to?("sqlstate")
ensure
    # déconnexion du serveur
    dbh.close if dbh

end