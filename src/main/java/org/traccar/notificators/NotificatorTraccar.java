package org.traccar.notificators;

import org.traccar.Context;

public class NotificatorGeontrack extends NotificatorFirebase {

    public NotificatorGeontrack() {
        super(
                "https://www.traccar.org/push/",
                Context.getConfig().getString("notificator.traccar.key"));
    }

}
