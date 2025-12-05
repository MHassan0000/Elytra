package com.elytra.backend.Repository;

import com.elytra.backend.Models.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {

    List<Area> findByZoneId(Long zoneId);

    Optional<Area> findByZoneIdAndName(Long zoneId, String name);

    boolean existsByZoneIdAndName(Long zoneId, String name);
}
