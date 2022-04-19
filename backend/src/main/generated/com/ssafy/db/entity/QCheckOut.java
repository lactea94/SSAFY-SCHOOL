package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCheckOut is a Querydsl query type for CheckOut
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCheckOut extends EntityPathBase<CheckOut> {

    private static final long serialVersionUID = 1548873448L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCheckOut checkOut = new QCheckOut("checkOut");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    public final DatePath<java.time.LocalDate> createdDate = createDate("createdDate", java.time.LocalDate.class);

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QUser user;

    public QCheckOut(String variable) {
        this(CheckOut.class, forVariable(variable), INITS);
    }

    public QCheckOut(Path<? extends CheckOut> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCheckOut(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCheckOut(PathMetadata metadata, PathInits inits) {
        this(CheckOut.class, metadata, inits);
    }

    public QCheckOut(Class<? extends CheckOut> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

