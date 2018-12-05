module Files
    @list_files = [
        "1-base_database",
      ]; 
  
    def self.list_files
      return @list_files
    end
  
    def self.list_files=(val)
      @test_val=val;
    end
  end

