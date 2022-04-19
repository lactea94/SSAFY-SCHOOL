package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGameNotice is a Querydsl query type for GameNotice
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QGameNotice extends EntityPathBase<GameNotice> {

    private static final long serialVersionUID = -873184596L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGameNotice gameNotice = new QGameNotice("gameNotice");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createdDate = createDateTime("createdDate", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath title = createString("title");

    public final DateTimePath<java.time.LocalDateTime> updatedDate = createDateTime("updatedDate", java.time.LocalDateTime.class);

    public final QUser user;

    public QGameNotice(String variable) {
        this(GameNotice.class, forVariable(variable), INITS);
    }

    public QGameNotice(Path<? extends GameNotice> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGameNotice(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGameNotice(PathMetadata metadata, PathInits inits) {
        this(GameNotice.class, metadata, inits);
    }

    public QGameNotice(Class<? extends GameNotice> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

