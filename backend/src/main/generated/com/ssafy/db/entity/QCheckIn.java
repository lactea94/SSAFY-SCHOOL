package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCheckIn is a Querydsl query type for CheckIn
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCheckIn extends EntityPathBase<CheckIn> {

    private static final long serialVersionUID = 188510795L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCheckIn checkIn = new QCheckIn("checkIn");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    public final DatePath<java.time.LocalDate> createdDate = createDate("createdDate", java.time.LocalDate.class);

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QUser user;

    public QCheckIn(String variable) {
        this(CheckIn.class, forVariable(variable), INITS);
    }

    public QCheckIn(Path<? extends CheckIn> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCheckIn(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCheckIn(PathMetadata metadata, PathInits inits) {
        this(CheckIn.class, metadata, inits);
    }

    public QCheckIn(Class<? extends CheckIn> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

