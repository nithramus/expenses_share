require 'mysql'

table_config = 'table_config'

file_directory = "./database/delete/"

require_relative './list_files.rb'

list_files = Files.list_files

begin
    puts "Starting database update"
    # connexion au serveur MySQL
    dbh = Mysql.real_connect(ENV['SQLHOST'], ENV['SQLLOGIN'], ENV['SQLPASSWORD'], ENV['SQLDATABASE'])
    dbh.query("DROP TABLE #{table_config}")
    # dbh.query("INSERT INTO #{table_config} VALUES ('nique la police', 'mais je les aimes bien')")
    # get all db
    # dbh.query("DROP TABLE table_config")
    list_files.reverse_each do |file|
      update = `mysql -u#{ENV['SQLLOGIN']} -p#{ENV['SQLPASSWORD']} -h #{ENV['SQLHOST']} < #{file_directory + file}`;
    end
    puts "end"

  rescue Mysql::Error => e
    puts "Code d'erreur : #{e.errno}"
    puts "Message d'erreur : #{e.error}"
    puts "SQLSTATE d'erreur : #{e.sqlstate}" if e.respond_to?("sqlstate")
  ensure
    # déconnexion du serveur
    dbh.close if dbh

end