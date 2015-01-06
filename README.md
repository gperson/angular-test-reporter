# angular-test-reporter

This project was originally cloned from: https://github.com/angular/angular-seed.  I am using the angular-seed, to create a test reporting tool. It will pull test result data and show it in a simple web app.

## How to run?

Prerequisites - MySQL and MySQL Workbench installed

On Mac:

1. Clone to machine
2. Installed node.js
4. Run create-tables.sql in MySQL Workbench to create tables (.../angular-test-reporter/server/create-tables.sql)
5. Open the start-server.sh file in the project
6. Edit the "cd" command to your projects path, i.e "... cd /Users/me/project/angular-test-reporter; ..."
7. Open terminal, got to directory of project
8. Run ./start-server.sh
9. Navigate to http://localhost:8000/app/

## Usage - With Java connector
To use angular-test-reporter with Java projects, simply add the atr-connector-x-x-x.jar (in the connectors folder) to the projects build path. Bellow are some basic examples of usage:

<pre>
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import atr.connect.enums.TestStatus;
import atr.connect.reporter.TestReporter;

public class DummyTest {

    /**
     * Initialize TestReporter with URL of the default data-server.
     * By default it posts tests to the tests_Default database table,
     * to change use tr.setProjectTable("tests_ExampleProject")
     */
    TestReporter tr = new TestReporter("http://localhost:4968/addTest");
    
    @BeforeMethod
    public void setup() {
    	//Creates a 'test' and sets the Run Info
        tr.setTestInfo("Regression, Sprint 1");

    }

    /**
     * Basic and most common usage
     * @throws Throwable
     */
    @Test
    public void test_0() throws Throwable {
        try {
            int x = 2;
            int y = 3;
        	
        	//Sets information for the test
            tr.setTestInfo("test_0","X = "+x+", Y = "+y, "Checking if X + Y = Y + X");
            
            //The test
            Assert.assertEquals(x+y, y+x);
            
        } catch (Throwable e) {
            //If there is an error - catches the error, posts the results, and finally throws the error
            tr.failTest(e);
        } finally {
            //If there is no error -posts the results
            if (tr.status) {
                tr.passTest();
            }
        }
    }
    
    /**
     * Example where no information is set (Except run info in the before method...which we could omit also)
     * @throws Throwable
     */
    @Test
    public void test_2() throws Throwable { 
        try {
            //The test
            Assert.assertEquals("Are equal", "No");
        } catch (Throwable e) {
            tr.failTest(e);
        } finally {
            if (tr.status) {
                tr.passTest();
            }
        }
    }
    
    /**
     * Example of test results being posted the non-default table 
     * and non-default error message
     * @throws Throwable
     */
    @Test
    public void test_3() throws Throwable {
        try {
            //Sets the table to post info to
            tr.setProjectTable("tests_ExampleProject");
            
            //Sets the name of the test
            tr.setName("test_3");
            
            //The test
            Assert.assertEquals("Actual", "Expected");
            
        } catch (Throwable e) {
            //If error we add extra info to the test result
            tr.setExtra("Error with test");
            
            //Fails the test with the non-default error status and throws the error
            tr.failTestNonDefault(TestStatus.ERROR, e);
        } finally {
            if (tr.status) {
                tr.passTest();
            }
        }
    }
}
</pre>

