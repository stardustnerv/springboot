package com.example.demo;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opencsv.CSVWriter;

@RestController
public class CsvController {

    private static final String CSV_FILE_PATH = "D:\\devFolder\\demo\\src\\main\\resources\\dataBase\\bookmark.csv";

    @PostMapping("/append-to-csv")
    public String appendToCsv(@RequestParam("sentence") String sentence) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(CSV_FILE_PATH, true))) {
            writer.writeNext(new String[]{sentence});
            return "Success"; // or any other success response if needed
        } catch (IOException e) {
            e.printStackTrace();
            return "Error occurred while writing to the CSV file.";
        }
    }

    @PostMapping("/get-csv-content")
    public List<String[]> getCsvContent() {
        try (CSVReader reader = new CSVReader(new FileReader(CSV_FILE_PATH))) {
            return reader.readAll();
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return null;
        }
    }
}

