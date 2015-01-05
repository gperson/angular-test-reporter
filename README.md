# angular-test-reporter

This project was originally cloned from: https://github.com/angular/angular-seed.  I am using the angular-seed, to create a test reporting tool. It will pull test result data and show it in a simple web app.

## How to run?

Prerequisites - MySQL and MySQL Workbench installed

On Mac:

1. Clone to machine
2. Installed node.js
4. Run create-tables.sql in MySQL Workbench to create tables (../angular-test-reporter/server/create-tables.sql)
5. Open the start-server.sh file in the project
6. Edit the "cd" command to your projects path, i.e "... cd /Users/me/project/angular-test-reporter; ..."
7. Open terminal, got to directory of project
8. Run ./start-server.sh
9. Navigate to http://localhost:8000/app/

## Usage - With Java connector
To use angular-test-reporter with Java projects, simply add the atr-connector-x-x-x.jar to the projects build path. Bellow are some basic examples of usage using TestNG:
</pre>
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import atr.connect.enums.TestStatus;
import atr.connect.reporter.TestReporter;

public class DummyTest {

	TestReporter tr = new TestReporter("http://localhost:4968/addTest");

	@BeforeMethod
	public void setup() {
		//Sets start time for the test
		tr.setStartTime();
		
		//Sets run info
		tr.setRunInfo("Regression");
	}

	@Test
	public void test1() throws Throwable {
		//Example of basic usage
		try {
			//Sets information for the test
			tr.setTestInfo("test1", "Smoke Test", "X = 2, Y = 3", "Checking if X + Y = Y + X");
			
			//The test
			Assert.assertEquals(2 + 3, 3 + 2);
			
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

	@Test
	public void test2() throws Throwable {
		//Example where no information is set
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

	@Test
	public void test3() throws Throwable {
		//Example of test results being posted the non-default table
		try {
			//Sets the table to post info to
			tr.setProjectTable("tests_ExampleProject");
			
			//Creates a test setting the name to 'Test #3'
			tr.setTestInfo("Test #3");
			
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

