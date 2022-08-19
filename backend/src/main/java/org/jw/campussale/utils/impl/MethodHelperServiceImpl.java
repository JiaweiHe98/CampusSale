package org.jw.campussale.utils.impl;

import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.utils.MethodHelperService;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MethodHelperServiceImpl implements MethodHelperService {
    @Override
    public void runtimeExceptionIfNull(Object object, String methodName, String fieldName) {

        if (object == null) {
            log.error("Field '{}' cannot be null in {}!", fieldName, methodName);
            throw new RuntimeException(fieldName + " cannot be null!");
        }

    }
}
