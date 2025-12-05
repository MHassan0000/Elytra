package com.elytra.backend.Repository;

import com.elytra.backend.Models.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {

    List<Zone> findByCityId(Long cityId);

    Optional<Zone> findByCityIdAndName(Long cityId, String name);

    boolean existsByCityIdAndName(Long cityId, String name);
}
