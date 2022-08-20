package org.jw.campussale.Storage;

import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface StorageService {
    void store(MultipartFile file, String filename) throws IOException;

    InputStreamResource getImage(String name) throws FileNotFoundException;
}
