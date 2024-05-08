package com.cyber.escape.domain.thema.service;


import com.cyber.escape.domain.thema.dto.ThemaDto;
import com.cyber.escape.domain.thema.repository.ThemaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemaService {

    private final ThemaRepository themaRepository;

    public ThemaService(ThemaRepository themaRepository) {
        this.themaRepository = themaRepository;
    }

    public List<ThemaDto> getStandardThema(){
        return themaRepository.findStandardThema().stream().map(ThemaDto::from).toList();
    }

}
