package org.jw.campussale.Storage.impl;

import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.Storage.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;

@Service
@Slf4j
public class StorageServiceImpl implements StorageService {
    @Override
    public void store(MultipartFile file, Path path) throws IOException {
        log.info("New saving image '{}' to '{}'", file.getOriginalFilename(), path.toString());
        file.transferTo(path);
    }
}
