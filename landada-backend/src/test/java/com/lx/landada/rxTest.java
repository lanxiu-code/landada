package com.lx.landada;

import io.reactivex.Flowable;
import io.reactivex.Scheduler;
import io.reactivex.schedulers.Schedulers;
import org.junit.jupiter.api.Test;

import java.util.concurrent.TimeUnit;

public class rxTest {

    @Test
    public void test() throws InterruptedException {
        // 创建一个流，每秒发射一个递增的整数（数据流变化）
        Flowable<Long> flowable = Flowable.interval(1, TimeUnit.SECONDS)
                .map(i -> i + 1)
                .subscribeOn(Schedulers.io());//指定创建流的线程池
        // 绑定观察者，并打印每个接收到的数字
        flowable.observeOn(Schedulers.io())
                .doOnNext(System.out::println)
                .subscribe();

        Thread.sleep(10000L);

    }
}
