package org.jw.campussale.Storage.impl;

import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.Storage.StorageService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
public class StorageServiceImpl implements StorageService {
    @Override
    public void store(MultipartFile file, String fileName) throws IOException {
        Path path = Paths.get("./images", fileName);
        log.info("New saving image '{}' to '{}'", file.getOriginalFilename(), path.toString());
        file.transferTo(path);
    }

    public InputStreamResource getImage(String name) throws FileNotFoundException {
        File f = new File("./images", name);
        return new InputStreamResource(new FileInputStream(f));
    }
}
