package com.iskill.myskill.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FormatUtils {
    public static String getTimeString(Date date, String formatType)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(formatType);
        String time = sdf.format(date);
        return time;
    }
}
