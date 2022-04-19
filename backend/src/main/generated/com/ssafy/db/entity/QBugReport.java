package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBugReport is a Querydsl query type for BugReport
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBugReport extends EntityPathBase<BugReport> {

    private static final long serialVersionUID = 748369734L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBugReport bugReport = new QBugReport("bugReport");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createdDate = createDateTime("createdDate", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QUser user;

    public QBugReport(String variable) {
        this(BugReport.class, forVariable(variable), INITS);
    }

    public QBugReport(Path<? extends BugReport> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBugReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBugReport(PathMetadata metadata, PathInits inits) {
        this(BugReport.class, metadata, inits);
    }

    public QBugReport(Class<? extends BugReport> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

