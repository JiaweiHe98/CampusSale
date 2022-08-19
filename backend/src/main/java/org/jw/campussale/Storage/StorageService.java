package org.jw.campussale.Storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;

public interface StorageService {
    void store(MultipartFile file, Path path) throws IOException;
}
