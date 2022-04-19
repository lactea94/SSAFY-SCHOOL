package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudentStatus is a Querydsl query type for StudentStatus
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QStudentStatus extends EntityPathBase<StudentStatus> {

    private static final long serialVersionUID = -1766582901L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudentStatus studentStatus = new QStudentStatus("studentStatus");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Integer> classNumber = createNumber("classNumber", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath local = createString("local");

    public final NumberPath<Integer> studentId = createNumber("studentId", Integer.class);

    public final StringPath teamCode = createString("teamCode");

    public final QUser user;

    public QStudentStatus(String variable) {
        this(StudentStatus.class, forVariable(variable), INITS);
    }

    public QStudentStatus(Path<? extends StudentStatus> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudentStatus(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudentStatus(PathMetadata metadata, PathInits inits) {
        this(StudentStatus.class, metadata, inits);
    }

    public QStudentStatus(Class<? extends StudentStatus> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

