require 'mysql'
table_config = 'table_config'
require_relative './list_files.rb'

list_files = Files.list_files
file_directory = "./database/create/"
puts list_files

begin
    puts "Starting database update"
    # connexion au serveur MySQL
    dbh = Mysql.real_connect(ENV['SQLHOST'], ENV['SQLLOGIN'], ENV['SQLPASSWORD'])
    dbh.query("CREATE DATABASE IF NOT EXISTS #{ENV['SQLDATABASE']};")
    dbh.query("USE #{ENV['SQLDATABASE']}")
    dbh.query("CREATE TABLE IF NOT EXISTS #{table_config} (file_name TEXT, content TEXT)");
    # dbh.query("INSERT INTO #{table_config} VALUES ('nique la police', 'mais je les aimes bien')")
    # get all db
    list_update = dbh.query("SELECT * FROM #{table_config}")
    # dbh.query("DROP TABLE table_config")
    list_update.each_hash do |row|
      file = File.read(file_directory + row['file_name']);
      if (file != row['content'])
        puts "file #{row['file_name']} changed"
        return 1
      end
      list_files.delete(row['file_name'])
    end
    list_files.each do |file|
      puts "Updating with #{file}"
      content = File.read(file_directory + file);
      update = `mysql -u#{ENV['SQLLOGIN']} -p#{ENV['SQLPASSWORD']} -h #{ENV['SQLHOST']} < #{file_directory + file}`;
      puts update
      dbh.query("INSERT INTO #{table_config} VALUES ('#{file}', '#{Mysql.escape_string(content)}')");
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