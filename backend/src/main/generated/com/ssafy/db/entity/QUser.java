package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 846542477L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final ListPath<BugReport, QBugReport> bugReports = this.<BugReport, QBugReport>createList("bugReports", BugReport.class, QBugReport.class, PathInits.DIRECT2);

    public final ListPath<CheckIn, QCheckIn> checkIns = this.<CheckIn, QCheckIn>createList("checkIns", CheckIn.class, QCheckIn.class, PathInits.DIRECT2);

    public final ListPath<CheckOut, QCheckOut> checkOuts = this.<CheckOut, QCheckOut>createList("checkOuts", CheckOut.class, QCheckOut.class, PathInits.DIRECT2);

    public final ListPath<Community, QCommunity> communities = this.<Community, QCommunity>createList("communities", Community.class, QCommunity.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<GameNotice, QGameNotice> gameNotices = this.<GameNotice, QGameNotice>createList("gameNotices", GameNotice.class, QGameNotice.class, PathInits.DIRECT2);

    public final BooleanPath gender = createBoolean("gender");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Integer> isAdmin = createNumber("isAdmin", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final QStatus status;

    public final QStudentStatus studentStatus;

    public final StringPath userId = createString("userId");

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.status = inits.isInitialized("status") ? new QStatus(forProperty("status"), inits.get("status")) : null;
        this.studentStatus = inits.isInitialized("studentStatus") ? new QStudentStatus(forProperty("studentStatus"), inits.get("studentStatus")) : null;
    }

}

